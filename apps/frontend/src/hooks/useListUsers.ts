/* eslint-disable @typescript-eslint/no-explicit-any */
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { ListUsersDto } from '../constants/users';

export const DEFAULT_USERS_PAGE_SIZE = 10;

export const getListUsersQueryKey = (pageSize?: number, searchQ?: string) =>
  pageSize ? ['users', pageSize, searchQ] : ['users'];

export const useListUsers = () => {
  const [pageSize, setPageSize] = useState(DEFAULT_USERS_PAGE_SIZE);
  const [searchQ, setSearchQ] = useState('');
  const [currentPageIndex, setCurrentPageIndex] = useState(1);

  const fetchProjects = useCallback(
    async ({ pageParam }: { pageParam?: string }): Promise<ListUsersDto> => {
      const params = new URLSearchParams();
      params.set('limit', pageSize.toString());
      if (pageParam) {
        params.set('startAfter', pageParam);
      }

      if (searchQ) {
        params.set('name', searchQ);
      }

      const res = await fetch(`/api/users?${params.toString()}`);
      return res.json();
    },
    [pageSize, searchQ],
  );

  useEffect(() => {
    setCurrentPageIndex(1);
  }, [pageSize, searchQ]);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery<ListUsersDto, Error>({
    queryKey: getListUsersQueryKey(pageSize, searchQ),
    queryFn: fetchProjects,
    getNextPageParam: (lastPage: ListUsersDto) => lastPage.startAfter,
  } as any);

  const users =
    data?.pages.flatMap((group) => (group as any).users).filter(Boolean) || [];
  const delta = (currentPageIndex - 1) * pageSize;

  return {
    users: users.slice(delta, delta + pageSize),
    error,
    fetchNextPage,
    isLoading: isFetching || isFetchingNextPage,
    hasNextPage,
    setPageSize,
    pageSize,
    currentPageIndex,
    setCurrentPageIndex,
    totalPages: Math.ceil(users.length / pageSize),
    searchQ,
    setSearchQ,
    refetch,
  };
};
