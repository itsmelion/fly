import { render, screen } from '@testing-library/react';

import { Loader } from './loader';

describe('Loader', () => {
  it('renders loading feedback', () => {
    const { asFragment } = render(<Loader />);

    expect(screen.getByText('Loading...')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
