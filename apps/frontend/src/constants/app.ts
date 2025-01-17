import { createContext } from 'react';
import { BasePage } from './pages';

export interface Breadcrumb {
  text: string;
  href: string;
}

export type NotificationType =
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'in-progress';

export interface Notification {
  content: string;
  type: NotificationType;
  id: string;
}

export interface AppState {
  setBreadcrumps: (breadcrumps: Breadcrumb[]) => void;
  setActivePath: (activePath: BasePage) => void;
  setNotification: (notification: Notification) => void;
}

export const AppContext = createContext<AppState>({
  setBreadcrumps: () => {},
  setActivePath: () => {},
  setNotification: () => {},
});
