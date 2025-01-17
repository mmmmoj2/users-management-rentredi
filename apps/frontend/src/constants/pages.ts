export interface Breadcrumb {
  text?: string;
  href: string;
}

export interface BasePage {
  name: string;
  label: string;
  href: string;
  parent?: () => BasePage;
}

export interface Page extends BasePage {
  Component: () => JSX.Element;
}

export const PAGES = {
  home: {
    name: 'home',
    label: 'Home',
    href: '/',
  },

  users: {
    name: 'users',
    label: 'Users',
    href: '/users',
    parent: () => PAGES.home,
  },

  userDetails: {
    name: 'userDetails',
    label: 'User Details',
    href: '/users/:userId',
    parent: () => PAGES.users,
  },

  createUser: {
    name: 'createUser',
    label: 'Create User',
    href: '/create-user',
    parent: () => PAGES.home,
  },

  updateUser: {
    name: 'updateUser',
    label: 'Update User',
    href: '/users/:userId/update',
    parent: () => PAGES.users,
  },
};
