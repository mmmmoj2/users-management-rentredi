import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { vi } from 'vitest';
import { PAGES } from './constants/pages';

describe('App', () => {
  const setup = () => render(<App />);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the app layout with navigation open by default', () => {
    setup();

    expect(screen.getByText('Users management')).toBeInTheDocument();
  });

  it('navigates to the correct route', async () => {
    setup();

    expect(screen.getByText(PAGES.home.label)).toBeInTheDocument();

    fireEvent.click(screen.getByText('users'));
    await waitFor(() => screen.getByText(PAGES.users.label));
  });
});
