import type { NextRequest } from 'next/server';

import { flightListings } from './flight-listings';
import { getCursor, getPageSize, matchesSearch } from './helpers/cursor.helpers';

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
