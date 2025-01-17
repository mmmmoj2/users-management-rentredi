import {
  Button,
  Form,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { UserForm } from '../components/UserForm';
import * as React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { useAppContext } from '../hooks/useAppState';
import { useGetUser } from '../hooks';
import Spinner from '@cloudscape-design/components/spinner';
import { Formik } from 'formik';
import { UserSchema } from '../constants/users';
import { useMutateUsers } from '../hooks/useMutateUser';

export const UpdateUser = () => {
  const { setActivePath, setBreadcrumps, setNotification } = useAppContext();
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading: isLoadingUser } = useGetUser(userId);
  const { updateUser, isLoading: isLoadingUpdate } = useMutateUsers();

  const isLoading = isLoadingUser || isLoadingUpdate;

  React.useEffect(() => {
    setActivePath(PAGES.users);
    setBreadcrumps([
      { text: PAGES.home.label, href: PAGES.home.href },
      { text: PAGES.users.label, href: PAGES.users.href },
      {
        text: user?.name || 'user',
        href: generatePath(PAGES.userDetails.href, { userId }),
      },
      {
        text: PAGES.updateUser.label,
        href: generatePath(PAGES.updateUser.href, { userId }),
      },
    ]);
  }, [setActivePath, setBreadcrumps, user?.name, userId]);

  if (!userId || isLoadingUser || !user) {
    return <Spinner />;
  }

  return (
    <Formik
      initialValues={{ name: user.name, zip: user.zip }}
      validationSchema={UserSchema}
      onSubmit={async (values) => {
        const data = await updateUser({ ...values, id: userId });
        setNotification({
          content: 'User has been created sussceefully!',
          id: 'create-user-success',
          type: 'success',
        });
        navigate(generatePath(PAGES.userDetails.href, { userId: data.id }));
      }}
    >
      {({ handleSubmit }) => (
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button
                  formAction="none"
                  variant="link"
                  onClick={() =>
                    navigate(generatePath(PAGES.userDetails.href, { userId }))
                  }
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleSubmit()}
                  loading={isLoading}
                >
                  Update
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h1"></Header>}
          >
            <UserForm />
          </Form>
        </form>
      )}
    </Formik>
  );
};
