import { useContext } from 'react';
import { AppContext, AppState } from '../constants/app';

export function useAppContext() {
  const context = useContext(AppContext) as AppState;

  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
}
