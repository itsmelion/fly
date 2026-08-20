import { render, screen } from '@testing-library/react';

import { ErrorPanel } from './error-panel';
import { InfoPanel } from './info-panel';

describe('Panels', () => {
  it('renders an info panel', () => {
    const { asFragment } = render(
      <InfoPanel>Search for a route to compare fares.</InfoPanel>,
    );

    expect(
      screen.getByRole('heading', { name: 'Search for a route to compare fares.' }),
    ).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders an error panel as an alert', () => {
    const { asFragment } = render(
      <ErrorPanel>We could not load matching flights.</ErrorPanel>,
    );

    expect(screen.getByRole('alert').textContent).toBe(
      'We could not load matching flights.',
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
