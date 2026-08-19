import type { NextRequest } from 'next/server';
import { airports } from './airports';

export async function GET(_request: NextRequest) {
  return new Response(JSON.stringify(airports.Airports), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
