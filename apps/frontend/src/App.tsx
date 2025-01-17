import { useState } from 'react';
import { router } from './pages/index';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  AppLayout,
  BreadcrumbGroup,
  Flashbar,
  SideNavigation,
  FlashbarProps,
} from '@cloudscape-design/components';
import { BasePage, PAGES } from './constants/pages';
import { AppContext, Breadcrumb, Notification } from './constants/app';

const queryClient = new QueryClient();

function App() {
  const [showNavigation, setShowNavigation] = useState(true);
  const [activePath, setActivePath] = useState<BasePage>(PAGES.home);
  const [breadcrumps, setBreadcrumps] = useState<Breadcrumb[]>([]);
  const [notification, setNotification] =
    useState<FlashbarProps.MessageDefinition | null>(null);

  const createNotification = (notification: Notification) => {
    setNotification({
      ...notification,
      dismissible: true,
      onDismiss: () => setNotification(null),
    });
  };

  return (
    <AppContext.Provider
      value={{
        setActivePath,
        setBreadcrumps,
        setNotification: createNotification,
      }}
    >
      <AppLayout
        breadcrumbs={<BreadcrumbGroup items={breadcrumps} />}
        navigationOpen={showNavigation}
        onNavigationChange={({ detail }) => setShowNavigation(detail.open)}
        navigation={
          <SideNavigation
            activeHref={activePath.href}
            header={{
              href: PAGES.home.href,
              text: 'Users management',
            }}
            items={[
              {
                type: 'link',
                text: PAGES.home.label,
                href: PAGES.home.href,
              },
              {
                type: 'link',
                text: PAGES.users.label,
                href: PAGES.users.href,
              },
            ]}
          />
        }
        toolsHide
        notifications={
          <div style={{ height: '30px' }}>
            <Flashbar items={notification ? [notification] : []} />
          </div>
        }
        content={
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        }
      />
    </AppContext.Provider>
  );
}

export default App;
