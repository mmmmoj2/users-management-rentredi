/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, expect } from 'vitest';
import * as useListUsersInMap from '../hooks/useListUsersInMap';
import { Home } from './Home';
describe('Home', () => {
  const setup = () =>
    render(
      <MemoryRouter initialEntries={['/']}>
        <Home />
      </MemoryRouter>,
    );

  beforeEach(() => {
    vi.spyOn(useListUsersInMap, 'useListUsersInMap').mockReturnValue({
      data: [],
      isLoading: false,
    } as any);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders home page with map', () => {
    setup();

    expect(screen.getByTestId('map-container')).toBeInTheDocument();
    expect(screen.getByTestId('map-container')).toBeTruthy();
  });
});
