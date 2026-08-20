import { render, screen } from '@testing-library/react';

import { Label } from './label';

describe('Label', () => {
  it('renders an accessible label', () => {
    const { asFragment } = render(<Label htmlFor="destination">Destination</Label>);

    expect(screen.getByText('Destination')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
