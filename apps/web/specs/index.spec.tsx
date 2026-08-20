import { QueryProvider } from '@fly/services';
import { render } from '@testing-library/react';

import Page from '../src/app/page';

describe('Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async (input: string | URL) => {
      const url = new URL(String(input), 'http://localhost');

      if (url.pathname === '/api/airports') {
        return new Response(
          JSON.stringify([
            {
              ItemName: 'AMS',
              AirportName: 'Amsterdam (Schiphol)',
              Description: 'Amsterdam (Schiphol), Netherlands',
            },
          ]),
        );
      }

      return new Response(
        JSON.stringify({
          resultSet: {
            count: 0,
          },
          flightOffer: [],
        }),
      );
    }) as jest.Mock;
  });

  it('renders the flight search form', () => {
    const { getByLabelText } = render(
      <QueryProvider>
        <Page />
      </QueryProvider>,
    );

    expect(getByLabelText('Origin')).toBeTruthy();
    expect(getByLabelText('Destination')).toBeTruthy();
    expect(getByLabelText('Departure date')).toBeTruthy();
  });
});
