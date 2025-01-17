import { useQuery } from '@tanstack/react-query';
import { User } from '../constants/users';

export const getUserQueryKey = (id?: string) => ['user', id];

export const useGetUser = (userId?: string) => {
  return useQuery<User>({
    queryKey: getUserQueryKey(userId),
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      return res.json();
    },
    enabled: !!userId,
  });
};
