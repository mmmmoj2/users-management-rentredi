import { PAGES } from '../constants/pages';
import { UsersList } from './UsersList';
import { UserDetails } from './UserDetails';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './Home';
import { CreateUser } from './CreateUser';
import { UpdateUser } from './UpdateUser';

export const router = createBrowserRouter([
  {
    path: PAGES.home.href,
    Component: Home,
  },
  {
    path: PAGES.users.href,
    Component: UsersList,
  },
  {
    path: PAGES.userDetails.href,
    Component: UserDetails,
  },
  {
    path: PAGES.createUser.href,
    Component: CreateUser,
  },
  {
    path: PAGES.updateUser.href,
    Component: UpdateUser,
  },
]);
