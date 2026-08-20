import type { NextRequest } from 'next/server';

import { GET } from './route';

class TestResponse {
  private readonly responseBody: string;

  constructor(body: string) {
    this.responseBody = body;
  }

  async json() {
    return JSON.parse(this.responseBody);
  }
}

function createRequest(url: string) {
  return {
    nextUrl: new URL(url),
  } as NextRequest;
}

describe('flight listings route', () => {
  beforeAll(() => {
    global.Response = TestResponse as unknown as typeof Response;
  });

  it('returns flights matching origin, destination, and departure date', async () => {
    const response = await GET(
      createRequest(
        'http://localhost/api/flight-listings?origin=AMS&destination=FNC&departureDate=2022-11-10',
      ),
    );
    const data = await response.json();

    expect(data.resultSet.count).toBeGreaterThan(0);
    expect(data.flightOffer).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          outboundFlight: expect.objectContaining({
            id: 'AMSFNC20221110HV6629',
          }),
          pricingInfoSum: expect.objectContaining({
            totalPriceAllPassengers: 58.7,
          }),
        }),
      ]),
    );
    for (const flight of data.flightOffer) {
      expect(flight.outboundFlight.departureAirport.locationCode).toBe('AMS');
      expect(flight.outboundFlight.arrivalAirport.locationCode).toBe('FNC');
      expect(flight.outboundFlight.departureDateTime).toMatch(/^2022-11-10/);
    }
  });

  it('returns an empty response when no flight matches', async () => {
    const response = await GET(
      createRequest(
        'http://localhost/api/flight-listings?origin=AMS&destination=XXX&departureDate=2022-11-10',
      ),
    );
    const data = await response.json();

    expect(data).toEqual({
      resultSet: {
        count: 0,
      },
      flightOffer: [],
      pageInfo: {
        nextCursor: null,
      },
    });
  });

  it('returns cursor pagination state for longer result sets', async () => {
    const response = await GET(
      createRequest(
        'http://localhost/api/flight-listings?origin=AMS&departureDate=2022-11-10&limit=2',
      ),
    );
    const data = await response.json();

    expect(data.resultSet.count).toBeGreaterThan(2);
    expect(data.flightOffer).toHaveLength(2);
    expect(data.pageInfo.nextCursor).toBe('2');
  });
});
