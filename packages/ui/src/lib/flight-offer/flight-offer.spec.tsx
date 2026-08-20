import { render, screen } from '@testing-library/react';

import type { FlightOffer as FlightOfferData } from '@fly/services';

import { FlightOffer } from './flight-offer';

const flight = {
  outboundFlight: {
    id: 'AMSFNC20221110HV6629',
    departureDateTime: '2022-11-10T06:25:00',
    arrivalDateTime: '2022-11-10T09:35:00',
    marketingAirline: {
      companyShortName: 'HV',
    },
    flightNumber: 6629,
    departureAirport: {
      locationCode: 'AMS',
    },
    arrivalAirport: {
      locationCode: 'FNC',
    },
  },
  pricingInfoSum: {
    totalPriceAllPassengers: 58.7,
    totalPriceOnePassenger: 58.7,
    baseFare: 29.51,
    taxSurcharge: 29.19,
    currencyCode: 'EUR',
    productClass: 'Basic',
  },
  deeplink: {
    href: 'https://www.transavia.com/',
  },
} satisfies FlightOfferData;

const airportLabels = new Map([
  ['AMS', 'Amsterdam (Schiphol) (AMS)'],
  ['FNC', 'Funchal (FNC)'],
]);

describe('FlightOffer', () => {
  it('renders friendly airport names and total price', () => {
    const { asFragment } = render(
      <FlightOffer flight={flight} getAirportLabel={(code) => airportLabels.get(code)} />,
    );

    expect(
      screen.getByRole('heading', {
        name: 'Amsterdam (Schiphol) (AMS) to Funchal (FNC)',
      }),
    ).toBeTruthy();
    expect(screen.getByText('HV 6629 - Basic')).toBeTruthy();
    expect(screen.getByText(/58[,.]70/)).toBeTruthy();
    expect(screen.getByRole('link', { name: 'View flight details' })).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('falls back to airport codes without matching labels', () => {
    render(<FlightOffer flight={flight} getAirportLabel={() => undefined} />);

    expect(screen.getByRole('heading', { name: 'AMS to FNC' })).toBeTruthy();
  });
});
