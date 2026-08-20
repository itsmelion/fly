import { render, screen } from '@testing-library/react';

import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('renders a labelled date trigger with a formatted date', () => {
    const { asFragment } = render(
      <DatePicker
        id="departure-date"
        label="Departure date"
        date={new Date(2026, 0, 15)}
        info="Choose the first day of travel."
      />,
    );

    expect(screen.getByText('Departure date')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: 'Departure date' }),
    ).toBeTruthy();
    expect(screen.getByText('Jan 15, 2026')).toBeTruthy();
    expect(screen.getByText('Choose the first day of travel.')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders placeholder and error copy when no date is selected', () => {
    render(
      <DatePicker
        id="return-date"
        label="Return date"
        placeholder="Pick return"
        error="Return date is required."
      />,
    );

    expect(screen.getByRole('button', { name: 'Return date' })).toBeTruthy();
    expect(screen.getByText('Pick return')).toBeTruthy();
    expect(screen.getByText('Return date is required.')).toBeTruthy();
  });
});
