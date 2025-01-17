import {
  Button,
  ButtonDropdown,
  SpaceBetween,
} from '@cloudscape-design/components';
import { generatePath, useNavigate } from 'react-router-dom';
import { User } from '../constants/users';
import { FC } from 'react';
import { PAGES } from '../constants/pages';

export interface TableActionProps {
  selectedUsers: User[];
  onDelete: () => void;
}

export const TableAction: FC<TableActionProps> = ({
  selectedUsers,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <SpaceBetween direction="horizontal" size="xs">
      <ButtonDropdown
        disabled={!selectedUsers.length}
        onItemClick={({ detail }) => {
          switch (detail?.id) {
            case 'mv':
              navigate(
                generatePath(PAGES.updateUser.href, {
                  userId: selectedUsers[0].id,
                }),
              );
              break;
            case 'rn':
              onDelete();
              break;
          }
        }}
        items={[
          {
            text: 'Edit',
            id: 'mv',
            disabled: false,
          },
          {
            text: 'Delete',
            id: 'rn',
            disabled: false,
          },
        ]}
      >
        Actions
      </ButtonDropdown>
      <Button
        variant="primary"
        onClick={() => navigate(PAGES.createUser.href)}
        data-testid="create-user-btn"
      >
        Create user
      </Button>
    </SpaceBetween>
  );
};
