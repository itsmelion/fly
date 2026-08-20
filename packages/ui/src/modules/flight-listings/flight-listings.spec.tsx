import { render, screen } from '@testing-library/react';

import { FlightListings } from './flight-listings';

jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getTotalSize: () => 156,
    getVirtualItems: () => [
      {
        index: 0,
        start: 0,
      },
    ],
    measureElement: jest.fn(),
  }),
}));

jest.mock('@fly/services', () => ({
  useAirports: () => ({
    data: [
      {
        ItemName: 'AMS',
        AirportName: 'Amsterdam (Schiphol)',
        Description: 'Amsterdam (Schiphol), Netherlands',
      },
      {
        ItemName: 'FNC',
        AirportName: 'Funchal',
        Description: 'Funchal, Portugal',
      },
    ],
  }),
  useFlightListings: () => ({
    data: {
      pages: [
        {
          resultSet: {
            count: 1,
          },
          flightOffer: [
            {
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
            },
          ],
          pageInfo: {
            nextCursor: null,
          },
        },
      ],
    },
    fetchNextPage: jest.fn(),
    hasNextPage: false,
    isFetchingNextPage: false,
    isLoading: false,
    isError: false,
  }),
}));

describe('FlightListings', () => {
  it('renders friendly airport names and total price for matching flights', () => {
    render(
      <FlightListings
        search={{
          origin: 'AMS',
          destination: 'FNC',
          departureDate: '2022-11-10',
        }}
      />,
    );

    expect(
      screen.getByText('Amsterdam (Schiphol) (AMS) to Funchal (FNC)'),
    ).toBeTruthy();
    expect(screen.getByText('HV 6629 - Basic')).toBeTruthy();
    expect(screen.getByText(/58[,.]70/)).toBeTruthy();
  });
});
