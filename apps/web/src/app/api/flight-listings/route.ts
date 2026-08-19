import type { NextRequest } from 'next/server';

import { flightListings } from './flight-listings';

export async function GET(_request: NextRequest) {
  return new Response(JSON.stringify(flightListings), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
