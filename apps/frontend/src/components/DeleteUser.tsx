import { FC } from 'react';
import { Confirm } from './Confirm';
import { useAppContext } from '../hooks/useAppState';
import { useMutateUsers } from '../hooks/useMutateUser';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';

export interface DeleteUserProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export const DeleteUser: FC<DeleteUserProps> = ({ open, onClose, userId }) => {
  const { setNotification } = useAppContext();
  const { deleteUser, isLoading } = useMutateUsers();
  const navigate = useNavigate();
  console.log('test');

  const onDelete = async (confirm?: boolean) => {
    if (confirm) {
      await deleteUser(userId);
      setNotification({
        content: 'User has been deleted sussceefully!',
        id: 'delete-user-success',
        type: 'success',
      });
      navigate(PAGES.users.href);
    }

    onClose();
  };

  if (!open) return null;
  return (
    <Confirm
      loading={isLoading}
      open={open}
      content="Confirm deletion will result in losing user information. Continue?"
      onClose={onDelete}
    />
  );
};
