import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OrderDirection, QueryDto } from './dto/search-users.dto';
import {
  MIN_RADIUS_IN_MILE,
  MAX_RADIUS_IN_MILE,
  MAX_RECORDS_LIMIT,
  MIN_RECORDS_LIMIT,
} from '../config/index';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.validateInputForCreate(createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(
    @Query('limit') limit: number = MIN_RECORDS_LIMIT,
    @Query('radius') radius: number = MIN_RADIUS_IN_MILE,
    @Query('startAfter') startAfter?: string,
    @Query('orderBy') orderBy?: string,
    @Query('orderDirection') orderDirection?: OrderDirection,
    @Query('name') name?: string,
    @Query('zip') zip?: string,
  ) {
    const query: QueryDto = {
      limit: Math.min(MAX_RECORDS_LIMIT, Number(limit)),
      startAfter,
      orderBy,
      orderDirection,
      name,
      zip,
      radius: Math.max(
        MAX_RADIUS_IN_MILE,
        Math.min(MIN_RADIUS_IN_MILE, Number(radius)),
      ),
    };
    return this.usersService.findAll(query);
  }

  @Get('/map')
  async findMapUsers(
    @Query('radius') radius: number = MIN_RADIUS_IN_MILE,
    @Query('lat') lat: number,
    @Query('lng') lng: number,
  ) {
    if (!radius || !lat || !lng) {
      throw new HttpException(
        {
          message: 'Invalid input',
          error: 'Validation',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    return this.usersService.searchByLocation(
      Number(lat),
      Number(lng),
      Number(radius),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.validateInputForUpdate(updateUserDto);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  validateInputForCreate(input: CreateUserDto) {
    if (!input || !input.name || !input.zip) {
      throw new HttpException(
        {
          message: 'Invalid input',
          error: 'Validation',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  validateInputForUpdate(input: UpdateUserDto) {
    if (!input) {
      throw new HttpException(
        {
          message: 'Invalid input',
          error: 'Validation',
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
