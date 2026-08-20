import type { NextRequest } from 'next/server';

import { flightListings } from './flight-listings';

const defaultPageSize = 20;

function getPageSize(searchParams: URLSearchParams) {
  const requestedLimit = Number(searchParams.get('limit'));

  if (!Number.isFinite(requestedLimit) || requestedLimit < 1) {
    return defaultPageSize;
  }

  return Math.min(requestedLimit, 50);
}

function getCursor(searchParams: URLSearchParams) {
  const requestedCursor = Number(searchParams.get('cursor'));

  if (!Number.isFinite(requestedCursor) || requestedCursor < 0) {
    return 0;
  }

  return requestedCursor;
}

function matchesSearch(
  flight: (typeof flightListings.flightOffer)[number],
  searchParams: URLSearchParams,
) {
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const outboundFlight = flight.outboundFlight;

  return (
    (!origin || outboundFlight.departureAirport.locationCode === origin) &&
    (!destination ||
      outboundFlight.arrivalAirport.locationCode === destination) &&
    (!departureDate ||
      outboundFlight.departureDateTime.slice(0, 10) === departureDate)
  );
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cursor = getCursor(searchParams);
  const limit = getPageSize(searchParams);
  const matchingFlights = flightListings.flightOffer.filter((flight) =>
    matchesSearch(flight, request.nextUrl.searchParams),
  );
  const flightOffer = matchingFlights.slice(cursor, cursor + limit);
  const nextCursor =
    cursor + limit < matchingFlights.length ? String(cursor + limit) : null;

  return new Response(
    JSON.stringify({
      resultSet: {
        count: matchingFlights.length,
      },
      flightOffer,
      pageInfo: {
        nextCursor,
      },
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
