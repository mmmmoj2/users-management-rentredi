import {
  Button,
  Form,
  Header,
  SpaceBetween,
} from '@cloudscape-design/components';
import { UserForm } from '../components/UserForm';
import { Formik } from 'formik';
import { generatePath, useNavigate } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import { UserSchema } from '../constants/users';
import { useMutateUsers } from '../hooks/useMutateUser';
import { useAppContext } from '../hooks/useAppState';
import * as React from 'react';

export const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser, isLoading } = useMutateUsers();
  const { setNotification, setActivePath, setBreadcrumps } = useAppContext();

  React.useEffect(() => {
    setActivePath(PAGES.users);
    setBreadcrumps([
      { text: PAGES.home.label, href: PAGES.home.href },
      { text: PAGES.createUser.label, href: PAGES.createUser.href },
    ]);
  }, [setActivePath, setBreadcrumps]);

  return (
    <Formik
      initialValues={{ name: '', zip: '' }}
      validationSchema={UserSchema}
      onSubmit={async (values) => {
        const data = await createUser(values);
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
                  onClick={() => navigate(PAGES.users.href)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleSubmit()}
                  loading={isLoading}
                  data-testid="create-user"
                >
                  Create
                </Button>
              </SpaceBetween>
            }
            header={<Header variant="h1">Create User</Header>}
          >
            <UserForm />
          </Form>
        </form>
      )}
    </Formik>
  );
};
