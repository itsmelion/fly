import { render, screen } from '@testing-library/react';

import { Calendar } from './calendar';

describe('Calendar', () => {
  it('renders a selected single-month calendar', () => {
    const { asFragment } = render(
      <Calendar
        mode="single"
        month={new Date(2026, 0, 1)}
        selected={new Date(2026, 0, 15)}
      />,
    );

    expect(screen.getByRole('grid')).toBeTruthy();
    expect(screen.getByLabelText(/January 15th, 2026/)).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
