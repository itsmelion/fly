import { useInfiniteQuery } from '@tanstack/react-query';

const pageSize = 20;

async function fetchFlightListings(
  params: FlightListingsParams,
  cursor = '0',
): Promise<FlightListingResponse | null> {
  const searchParams = new URLSearchParams({
    origin: params.origin,
    destination: params.destination,
    departureDate: params.departureDate,
    cursor,
    limit: String(pageSize),
  });
  const response = await fetch(`/api/flight-listings?${searchParams}`);

  if (!response.ok) {
    throw new Error('Failed to fetch flight listings');
  }

  return response.json() ?? null;
}

export type FlightListingResponse = {
  resultSet: {
    count: number;
  };
  flightOffer: FlightOffer[];
  pageInfo: {
    nextCursor: string | null;
  };
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
  origin: string;
  destination: string;
  departureDate: string;
};

export function useFlightListings(params?: FlightListingsParams) {
  return useInfiniteQuery({
    queryKey: ['flight-listings', params],
    queryFn: ({ pageParam }) => {
      if (!params) {
        return {
          resultSet: {
            count: 0,
          },
          flightOffer: [],
          pageInfo: {
            nextCursor: null,
          },
        } satisfies FlightListingResponse;
      }

      return fetchFlightListings(params, String(pageParam)).then(
        (data) =>
          data ?? {
            resultSet: {
              count: 0,
            },
            flightOffer: [],
            pageInfo: {
              nextCursor: null,
            },
          },
      );
    },
    enabled: !!params,
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.pageInfo.nextCursor,
  });
}
