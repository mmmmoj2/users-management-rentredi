/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, forwardRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { User } from '../constants/users';
import { UserMark } from './UserMark';

export interface UsersMapProps {
  users: User[];
  center: [number, number];
  ref?: any;
}

export const UsersMap: FC<UsersMapProps> = forwardRef(
  ({ users, center }, ref) => {
    return (
      <div
        style={{
          height: '100%',
          display: 'grid',
          padding: '0 25px',
          marginTop: '20px',
        }}
        data-testid="map-container"
      >
        <MapContainer
          center={center}
          // maxZoom={15}
          zoom={13}
          // minZoom={10}
          ref={ref as any}
          // scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {users.map((user) => (
            <UserMark key={user.id} user={user} />
          ))}
        </MapContainer>
      </div>
    );
  },
);
