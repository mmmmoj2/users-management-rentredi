import * as React from 'react';
import Container from '@cloudscape-design/components/container';
import { User } from '../constants/users';
import { PAGES } from '../constants/pages';
import { useListUsers } from '../hooks';
import { useAppContext } from '../hooks/useAppState';
import { DeleteUser } from '../components/DeleteUser';
import { UsersPaginationProps } from '../components/UsersPagination';
import { UsersTable } from '../components/UsersTable';

export const UsersList = () => {
  const [showDeleteUser, setShowDeleteUser] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<User[]>([]);
  const {
    users,
    totalPages,
    fetchNextPage,
    hasNextPage,
    pageSize,
    setPageSize,
    currentPageIndex,
    setCurrentPageIndex,
    searchQ,
    setSearchQ,
  } = useListUsers();
  const { setBreadcrumps, setActivePath } = useAppContext();

  React.useEffect(() => {
    setActivePath(PAGES.users);
    setBreadcrumps([
      { text: PAGES.home.label, href: PAGES.home.href },
      { text: PAGES.users.label, href: PAGES.users.href },
    ]);
  }, [setActivePath, setBreadcrumps]);

  const pagination: UsersPaginationProps = React.useMemo(
    () => ({
      currentPageIndex,
      onChange: (page: number) => {
        setCurrentPageIndex(page);
        if (page > totalPages && hasNextPage) {
          fetchNextPage();
        }
      },
      pageCount: hasNextPage ? totalPages + 1 : totalPages,
      pageSize,
      onChangePageSize: (size: number) => {
        if (size) {
          setPageSize(size);
          setCurrentPageIndex(1);
        }
      },
    }),
    [
      currentPageIndex,
      fetchNextPage,
      hasNextPage,
      pageSize,
      setCurrentPageIndex,
      setPageSize,
      totalPages,
    ],
  );

  return (
    <Container>
      <UsersTable
        onSelectUsers={setSelectedItems}
        selectedUsers={selectedItems}
        onDelete={() => setShowDeleteUser(true)}
        users={users || []}
        pagination={pagination}
        searchQ={searchQ}
        setSearchQ={setSearchQ}
      />
      {!!selectedItems.length && (
        <DeleteUser
          open={showDeleteUser}
          onClose={() => setShowDeleteUser(false)}
          userId={selectedItems[0]?.id}
        />
      )}
    </Container>
  );
};
