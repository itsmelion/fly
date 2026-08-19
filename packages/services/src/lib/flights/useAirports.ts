import { useQuery } from '@tanstack/react-query';

interface Airport {
  ItemName: string;
  AirportName: string;
  Description: string;
}

async function fetchAirports(): Promise<Airport[] | null> {
  const response = await fetch('/api/airports');

  if (!response.ok) {
    throw new Error('Failed to fetch airports');
  }

  return response.json() ?? null;
}

export function useAirports() {
  return useQuery({
    queryKey: ['airports'],
    queryFn: fetchAirports,
  });
}
