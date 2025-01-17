import { render, screen } from '@testing-library/react';
import App from './App';
import { vi, expect } from 'vitest';
import { PAGES } from './constants/pages';

describe('App', () => {
  const setup = () => render(<App />);

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the app layout with navigation open by default', () => {
    setup();

    expect(screen.getByText('Users management')).toBeInTheDocument();
  });

  it('navigates to the correct route', async () => {
    setup();

    expect(screen.getByText(PAGES.users.label)).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: PAGES.users.label }),
    ).toHaveAttribute('href', PAGES.users.href);
  });
});
