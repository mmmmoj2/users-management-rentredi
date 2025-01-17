import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API, axios } from '../utils/api';
import { CreateUserRequest, UpdateUserRequest } from '../constants/users';
import { useAppContext } from './useAppState';
import { getListUsersQueryKey, DEFAULT_USERS_PAGE_SIZE } from './useListUsers';
import { getUserQueryKey } from './useGetUser';
import { getListUsersInMapKey } from './useListUsersInMap';

export const useMutateUsers = () => {
  const { setNotification } = useAppContext();
  const queryClient = useQueryClient();

  const createMutate = useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const res = await axios.post(API.users, data);
      await queryClient.invalidateQueries({
        queryKey: getListUsersQueryKey(DEFAULT_USERS_PAGE_SIZE),
      });
      await queryClient.invalidateQueries({
        queryKey: getListUsersInMapKey(0, 0),
      });
      return res.data;
    },
    onError: () => {
      setNotification({
        type: 'error',
        content: 'Error when creating user!',
        id: 'create-user-error',
      });
    },
  });

  const deleteMutate = useMutation({
    mutationFn: async (userId: string) => {
      await axios.delete(API.userDetails(userId));
      await queryClient.invalidateQueries({
        queryKey: getListUsersQueryKey(DEFAULT_USERS_PAGE_SIZE),
      });
      await queryClient.invalidateQueries({
        queryKey: getUserQueryKey(userId),
      });
      await queryClient.invalidateQueries({
        queryKey: getListUsersInMapKey(0, 0),
      });
    },
    onError: () => {
      setNotification({
        type: 'error',
        content: 'Error when updating user!',
        id: 'update-user-error',
      });
    },
  });

  const updateMutate = useMutation({
    mutationFn: async (data: UpdateUserRequest) => {
      const res = await axios.patch(API.userDetails(data.id), data);
      await queryClient.invalidateQueries({
        queryKey: getListUsersQueryKey(DEFAULT_USERS_PAGE_SIZE),
      });
      await queryClient.invalidateQueries({
        queryKey: getUserQueryKey(data.id),
      });
      await queryClient.invalidateQueries({
        queryKey: getListUsersInMapKey(0, 0),
      });
      return res.data;
    },
    onError: () => {
      setNotification({
        type: 'error',
        content: 'Error when deleting user!',
        id: 'delete-user-error',
      });
    },
  });

  return {
    createUser: createMutate.mutateAsync,
    deleteUser: deleteMutate.mutateAsync,
    updateUser: updateMutate.mutateAsync,
    isLoading:
      createMutate.isPending ||
      deleteMutate.isPending ||
      updateMutate.isPending,
  };
};
