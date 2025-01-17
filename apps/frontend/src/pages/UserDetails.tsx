import * as React from 'react';
import Container from '@cloudscape-design/components/container';
import ContentLayout from '@cloudscape-design/components/content-layout';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import Header from '@cloudscape-design/components/header';
import { useGetUser } from '../hooks';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Spinner from '@cloudscape-design/components/spinner';
import 'leaflet/dist/leaflet.css';
import { Button, SpaceBetween } from '@cloudscape-design/components';
import { PAGES } from '../constants/pages';
import { useAppContext } from '../hooks/useAppState';
import { DeleteUser } from '../components/DeleteUser';

import { UsersMap } from '../components/UsersMap';

export const UserDetails = () => {
  const [showDeleteUser, setShowDeleteUser] = React.useState(false);
  const { userId } = useParams<{ userId: string }>();
  const { data: user, isLoading } = useGetUser(userId);
  const { setActivePath, setBreadcrumps } = useAppContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    setActivePath(PAGES.users);
    setBreadcrumps([
      { text: PAGES.home.label, href: PAGES.home.href },
      { text: PAGES.users.label, href: PAGES.users.href },
      {
        text: user?.name || 'user',
        href: generatePath(PAGES.userDetails.href, { userId }),
      },
    ]);
  }, [setActivePath, setBreadcrumps, user?.name, userId]);

  if (!userId || isLoading || !user) {
    return <Spinner />;
  }

  return (
    <div>
      <ContentLayout
        defaultPadding
        header={
          <Header
            headingTagOverride="h3"
            actions={
              <SpaceBetween direction="horizontal" size="xs">
                <Button onClick={() => setShowDeleteUser(true)}>Delete</Button>
                <Button
                  onClick={() =>
                    navigate(generatePath(PAGES.updateUser.href, { userId }))
                  }
                >
                  Update
                </Button>
              </SpaceBetween>
            }
          >
            User details
          </Header>
        }
      >
        <Container
          media={{
            content: (
              <UsersMap
                center={[user?.latitude, user?.longitude]}
                users={[user]}
              />
            ),
            height: 300,
            position: 'top',
          }}
        >
          <KeyValuePairs
            columns={4}
            items={[
              { label: 'Name', value: user.name },
              { label: 'Zip code', value: user.zip },
              { label: 'Timezone', value: user.timezone },
              {
                label: 'Location',
                value: `${user.latitude}, ${user.longitude}`,
              },
            ]}
          />
        </Container>
        {showDeleteUser && userId && (
          <DeleteUser
            open={showDeleteUser}
            onClose={() => setShowDeleteUser(false)}
            userId={userId}
          />
        )}
      </ContentLayout>
    </div>
  );
};
