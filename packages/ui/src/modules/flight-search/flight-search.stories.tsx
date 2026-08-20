import { QueryProvider } from '@fly/services';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { FlightSearch } from './flight-search';

const airports = [
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
  {
    ItemName: 'CTA',
    AirportName: 'Catania',
    Description: 'Catania, Italy',
  },
];

const flightOffer = [
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
];

function createJsonResponse(body: unknown) {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function installMockFetch() {
  const browserWindow = globalThis as typeof globalThis & {
    location?: { origin: string };
    fetch?: (input: string | URL) => Promise<Response>;
  };

  if (!browserWindow.location) {
    return;
  }

  browserWindow.fetch = async (input: string | URL) => {
    const url = new URL(String(input), browserWindow.location?.origin);

    if (url.pathname === '/api/airports') {
      return createJsonResponse(airports);
    }

    if (url.pathname === '/api/flight-listings') {
      const cursor = Number(url.searchParams.get('cursor') ?? 0);
      const limit = Number(url.searchParams.get('limit') ?? 20);
      const page = flightOffer.slice(cursor, cursor + limit);
      const nextCursor =
        cursor + limit < flightOffer.length ? String(cursor + limit) : null;

      return createJsonResponse({
        resultSet: {
          count: flightOffer.length,
        },
        flightOffer: page,
        pageInfo: {
          nextCursor,
        },
      });
    }

    return createJsonResponse(null);
  };
}

const meta: Meta<typeof FlightSearch> = {
  component: FlightSearch,
  title: 'Modules/FlightSearch',
  decorators: [
    (Story) => {
      installMockFetch();

      return (
        <QueryProvider>
          <Story />
        </QueryProvider>
      );
    },
  ],
};

export default meta;

type Story = StoryObj<typeof FlightSearch>;

export const Default: Story = {};
