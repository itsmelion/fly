import type { FlightListingResponse } from '@fly/services';

const defaultPageSize = 20;

export function getPageSize(searchParams: URLSearchParams) {
  const requestedLimit = Number(searchParams.get('limit'));

  if (!Number.isFinite(requestedLimit) || requestedLimit < 1) {
    return defaultPageSize;
  }

  return Math.min(requestedLimit, 50);
}

export function getCursor(searchParams: URLSearchParams) {
  const requestedCursor = Number(searchParams.get('cursor'));

  if (!Number.isFinite(requestedCursor) || requestedCursor < 0) {
    return 0;
  }

  return requestedCursor;
}

export function matchesSearch(
  flight: (FlightListingResponse['flightOffer'])[number],
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
