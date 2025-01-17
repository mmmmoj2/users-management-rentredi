import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { join } from 'path';
import { HttpService } from '@nestjs/axios';
import * as admin from 'firebase-admin';
import {
  geohashForLocation,
  geohashQueryBounds,
  Geopoint,
} from 'geofire-common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import {
  OPEN_WEATHER_URL,
  API_KEY,
  GEOTIMEZONE_URL,
  DB_TABLES,
} from '../config/index';
import { LocationResponseDto, TimezoneResponseDto } from './dto/location.dto';
import { OrderDirection, QueryDto } from './dto/search-users.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private db: admin.database.Database;
  private cachedZipCode: Map<string, LocationResponseDto>;
  private cachedTimezone: Map<string, TimezoneResponseDto>;

  constructor(private readonly httpService: HttpService) {
    // Initialize Firebase Admin SDK
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(
          join(
            __dirname,
            '../..',
            'user-management-34d14-firebase-adminsdk-dv9td-0459dd28c5.json',
          ),
        ),
        databaseURL:
          'https://user-management-34d14-default-rtdb.firebaseio.com/', // Add Realtime Database URL here
      });
    }
    this.db = admin.database();
    this.cachedZipCode = new Map();
    this.cachedTimezone = new Map();
  }

  normlizeSnapshot(data: any): User[] {
    return Object.entries(data || {}).map(([key, value]: any) => ({
      id: key,
      ...value,
    }));
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    // return 'This action adds a new user';
    const location = await this.extractLocation(createUserDto.zip);
    const timezone = await this.extractTimezone(location.lat, location.lon);
    const latitude = location.lat;
    const longitude = location.lon;
    const geohash = geohashForLocation([latitude, longitude]);
    const user = {
      name: createUserDto.name,
      zip: createUserDto.zip,
      latitude,
      longitude,
      timezone: timezone.iana_timezone,
      geohash,
    } as User;
    const ref = this.db.ref('users').push();
    await ref.set(user);
    user.id = ref.key!;
    return user;
  }

  async searchByLocation(
    latitude: number,
    longitude: number,
    radius: number,
  ): Promise<User[]> {
    const center = [latitude, longitude] as Geopoint;
    const bounds = geohashQueryBounds(center, radius * 1609.34);
    this.logger.debug(`radius = ${radius}`);

    const promises = bounds.map((b) =>
      this.db
        .ref(DB_TABLES.USERS)
        .orderByChild('geohash')
        .startAt(b[0])
        .endAt(b[1])
        .once('value'),
    );

    const snapshots = await Promise.all(promises);
    const mergedList = snapshots.flatMap((snapshot) =>
      this.normlizeSnapshot(snapshot.val()),
    );
    if (!mergedList) {
      return [];
    }

    this.logger.debug(mergedList);

    return Object.entries(mergedList).map(([key, value]: any) => ({
      id: key,
      ...value,
    }));
  }

  async searchByZipCode(
    q: QueryDto,
  ): Promise<{ users: User[]; startAfter?: string }> {
    const location = await this.extractLocation(q.zip);
    const latitude = location.lat;
    const longitude = location.lon;

    let users = await this.searchByLocation(latitude, longitude, q.radius);

    if (q.name) {
      users = users.filter((user) => user.name === q.name);
    }

    if (q.orderDirection === OrderDirection.DESC) {
      users = users.reverse();
    }

    return {
      users,
    };
  }

  async findAll(q: QueryDto): Promise<{ users: User[]; startAfter?: string }> {
    let query: any = this.db.ref(DB_TABLES.USERS);
    this.logger.debug(`q=${JSON.stringify(q)}`);

    // Order by a field
    if (q?.zip && q?.radius) {
      return this.searchByZipCode(q);
    } else if (q.name) {
      query = query.orderByChild('name');
    } else {
      query = query.orderByKey(); // Default ordering by key
    }

    // Apply filtering by name
    if (q.name) {
      query = query.startAt(q.name).endAt(q.name + '\uf8ff');
    }

    // Pagination: Add startAfter and limit
    if (q.startAfter) {
      query = query.startAfter(q.startAfter);
    }

    query = query.limitToFirst(q.limit + 1); // Fetch one extra record for "hasMore" detection

    const snapshot = await query.once('value');
    const list = snapshot.val();

    if (!list) {
      return { users: [] };
    }

    let users = this.normlizeSnapshot(list);

    // Sort entries (Firebase does not support descending directly)
    if (q.orderDirection === OrderDirection.DESC) {
      users = users.reverse();
    }

    const hasMore = users.length > q.limit;
    const nextToken = hasMore ? users[users.length - 2].id : undefined;
    return {
      users: hasMore ? users.slice(0, q.limit) : users,
      startAfter: nextToken,
    };
  }

  async findOne(id: string): Promise<User> {
    const snapshot = await this.db.ref(`users/${id}`).once('value');
    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      };
    }
    throw new HttpException(
      {
        message: 'Unexpected error, user not found',
        error: 'Validation',
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    user.name = updateUserDto.name;
    if (user.zip !== updateUserDto.zip) {
      const location = await this.extractLocation(updateUserDto.zip);
      const timezone = await this.extractTimezone(location.lat, location.lon);
      const latitude = location.lat;
      const longitude = location.lon;
      const geohash = geohashForLocation([latitude, longitude]);
      user.zip = updateUserDto.zip;
      user.latitude = latitude;
      user.longitude = longitude;
      user.timezone = timezone.iana_timezone;
      user.geohash = geohash;
    }
    await this.db.ref(`users/${id}`).update(user);
    return { ...user, id };
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.db.ref(`users/${id}`).remove();
  }

  async extractLocation(zipCode: string): Promise<LocationResponseDto> {
    if (this.cachedZipCode.has(zipCode)) {
      return this.cachedZipCode.get(zipCode);
    }
    const { data } = await this.httpService.axiosRef.get(
      `${OPEN_WEATHER_URL}?appid=${API_KEY}&zip=${zipCode}`,
    );
    this.cachedZipCode.set(zipCode, data);
    return data;
  }

  async extractTimezone(
    lat: number,
    lon: number,
  ): Promise<TimezoneResponseDto> {
    const key = `${lat}~${lon}`;
    if (this.cachedTimezone.has(key)) {
      return this.cachedTimezone.get(key);
    }
    const { data } = await this.httpService.axiosRef.get(
      `${GEOTIMEZONE_URL}?latitude=${lat}&longitude=${lon}`,
    );
    this.cachedTimezone.set(key, data);
    return data;
  }
}
