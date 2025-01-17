import { useQuery } from '@tanstack/react-query';
import { User } from '../constants/users';

export const getListUsersInMapKey = (lat: number, lng: number, radius = 10) => [
  'userInMap',
  lat,
  lng,
  radius,
];

export const useListUsersInMap = (lat: number, lng: number, radius = 10) => {
  return useQuery<User[]>({
    queryKey: getListUsersInMapKey(lat, lng, radius),
    queryFn: async () => {
      const res = await fetch(
        `/api/users/map?radius=${radius}&lat=${lat.toFixed(4)}&lng=${lng.toFixed(4)}`,
      );
      return res.json();
    },
    enabled: !!lat && !!lng && !!radius,
    // enabled: false,
  });
};
