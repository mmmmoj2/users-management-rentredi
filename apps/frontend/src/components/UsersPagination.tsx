import { Pagination } from '@cloudscape-design/components';
import { FC } from 'react';

export interface UsersPaginationProps {
  currentPageIndex: number;
  pageCount: number;
  onChange: (page: number) => void;
  pageSize: number;
  onChangePageSize: (page: number) => void;
}

export const UsersPagination: FC<UsersPaginationProps> = ({
  currentPageIndex,
  pageCount,
  onChange,
}) => {
  return (
    <Pagination
      currentPageIndex={currentPageIndex}
      pagesCount={pageCount}
      onChange={({ detail }) => {
        onChange(detail.currentPageIndex);
      }}
    />
  );
};
