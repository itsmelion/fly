import { useQuery } from '@tanstack/react-query';

async function fetchFlightListings(
  _params: FlightListingsParams,
): Promise<FlightListingResponse | null> {
  const response = await fetch('/api/flight-listings');

  if (!response.ok) {
    throw new Error('Failed to fetch flight listings');
  }

  return response.json() ?? null;
}

type FlightListingResponse = {
  resultSet: {
    count: number;
  };
  flightOffer: FlightOffer[];
};

export type FlightOffer = {
  outboundFlight: {
    id: string;
    departureDateTime: string;
    arrivalDateTime: string;
    marketingAirline: {
      companyShortName: string;
    };
    flightNumber: number;
    departureAirport: {
      locationCode: string;
    };
    arrivalAirport: {
      locationCode: string;
    };
  };
  pricingInfoSum: {
    totalPriceAllPassengers: number;
    totalPriceOnePassenger: number;
    baseFare: number;
    taxSurcharge: number;
    currencyCode: string;
    productClass: string;
  };
  deeplink: {
    href: string;
  };
};

export type FlightListingsParams = {
  origin?: string;
  destination?: string;
  dates?: Date;
};

export function useFlightListings(params: FlightListingsParams) {
  const { origin, dates } = params;

  return useQuery({
    queryKey: ['flight-listings', params],
    queryFn: () =>
      fetchFlightListings(params).then((data) => data?.flightOffer ?? []),
    enabled: !!origin && !!dates,
  });
}
