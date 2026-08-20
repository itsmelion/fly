import type { FlightOffer as FlightOfferData } from '@fly/services';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

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

const meta = {
  component: FlightOffer,
  title: 'Lib/FlightOffer/FlightOffer',
  args: {
    flight,
    getAirportLabel: (code) => airportLabels.get(code),
  },
} satisfies Meta<typeof FlightOffer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithAirportCodes = {
  args: {
    getAirportLabel: () => undefined,
  },
} satisfies Story;
