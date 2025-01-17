import CollectionPreferences from '@cloudscape-design/components/collection-preferences';
import { FC } from 'react';
import { UsersPaginationProps } from './UsersPagination';

export const UsersPreference: FC<UsersPaginationProps> = ({
  pageSize,
  onChangePageSize,
}) => {
  return (
    <CollectionPreferences
      onConfirm={({ detail }) => {
        onChangePageSize(detail.pageSize || 0);
      }}
      preferences={{ pageSize }}
      title="Preferences"
      confirmLabel="Confirm"
      cancelLabel="Cancel"
      pageSizePreference={{
        title: 'Page size',
        options: [
          { value: 1, label: '1 users' },
          { value: 10, label: '10 users' },
          { value: 25, label: '25 users' },
          { value: 50, label: '50 users' },
        ],
      }}
    />
  );
};
