import Table from '@cloudscape-design/components/table';
import Header from '@cloudscape-design/components/header';
import { User } from '../constants/users';
import { generatePath } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import Link from '@cloudscape-design/components/link';
import { FC } from 'react';
import { EmptyList } from './EmptyList';
import { TableAction } from './TableAction';
import { UsersPaginationProps, UsersPagination } from './UsersPagination';
import { UsersPreference } from './UsersPreference';
import { TextFilter } from '@cloudscape-design/components';
import { debounce } from 'lodash';

const COLUMN_DEFINITIONS = [
  {
    id: 'name',
    header: 'Name',
    cell: (e: User) => (
      <Link
        href={generatePath(PAGES.userDetails.href, { userId: e?.id || '' })}
      >
        {e?.name}
      </Link>
    ),
    isRowHeader: true,
  },
  {
    id: 'zip',
    header: 'Zip code',
    cell: (e: User) => e?.zip,
  },
  {
    id: 'localtion',
    header: 'Location',
    cell: (e: User) => `${e?.latitude}, ${e?.longitude}`,
  },
  {
    id: 'timezone',
    header: 'Timezone',
    cell: (e: User) => e?.timezone,
  },
];

export interface UsersTableProps {
  onSelectUsers: (users: User[]) => void;
  selectedUsers: User[];
  users: User[];
  onDelete?: () => void;
  pagination?: UsersPaginationProps;
  searchQ?: string;
  setSearchQ?: (txt: string) => void;
}

export const UsersTable: FC<UsersTableProps> = ({
  onSelectUsers,
  selectedUsers,
  onDelete,
  users,
  pagination,
  searchQ,
  setSearchQ,
}) => {
  const search = debounce((term) => {
    setSearchQ?.(term);
  }, 100);

  return (
    <Table<User>
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      onSelectionChange={({ detail }) => onSelectUsers(detail.selectedItems)}
      selectedItems={selectedUsers}
      ariaLabels={{
        selectionGroupLabel: 'Items selection',
        allItemsSelectionLabel: () => 'select all',
        itemSelectionLabel: (_, item) => item?.name,
      }}
      columnDefinitions={COLUMN_DEFINITIONS}
      enableKeyboardNavigation
      items={users || []}
      loadingText="Loading resources"
      selectionType="single"
      // trackBy="id"
      variant="embedded"
      empty={<EmptyList />}
      filter={
        setSearchQ ? (
          <TextFilter
            filteringPlaceholder="Find users"
            filteringText={searchQ || ''}
            countText={`${users?.length || 0} matches`}
            onChange={({ detail }) => search(detail.filteringText)}
          />
        ) : null
      }
      header={
        <Header
          actions={
            onDelete ? (
              <TableAction selectedUsers={selectedUsers} onDelete={onDelete} />
            ) : null
          }
        >
          Users
        </Header>
      }
      pagination={pagination ? <UsersPagination {...pagination} /> : null}
      preferences={pagination ? <UsersPreference {...pagination} /> : null}
    />
  );
};
