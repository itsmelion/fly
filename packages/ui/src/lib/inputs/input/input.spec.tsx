import { render, screen } from '@testing-library/react';

import { Input } from './input';

describe('Input', () => {
  it('associates its label, info, error, and control', () => {
    const { asFragment } = render(
      <Input
        id="origin"
        label="Origin"
        placeholder="Airport or city"
        info="Use the airport code when you know it."
        error="Origin is required."
      />,
    );

    expect(screen.getByLabelText('Origin')).toBeTruthy();
    expect(screen.getByText('Use the airport code when you know it.')).toBeTruthy();
    expect(screen.getByText('Origin is required.')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
