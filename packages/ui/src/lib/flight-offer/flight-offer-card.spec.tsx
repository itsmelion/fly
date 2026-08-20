import { render, screen } from '@testing-library/react';

import { FlightOfferCard } from './flight-offer-card';

describe('FlightOfferCard', () => {
  it('renders a measured virtualized card shell', () => {
    const measureElement = jest.fn();
    const { asFragment } = render(
      <FlightOfferCard index={3} measureElement={measureElement} start={312}>
        Flight offer
      </FlightOfferCard>,
    );

    expect(screen.getByText('Flight offer')).toBeTruthy();
    expect(measureElement).toHaveBeenCalled();
    expect(asFragment()).toMatchSnapshot();
  });
});
