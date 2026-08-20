'use client';
import {
  useAirports,
  useFlightListings,
  type FlightListingsParams,
} from '@fly/services';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef } from 'react';

import { formatPrice, dateTimeFormatter } from './helpers/formatters';
import { Button } from '../../lib/button/button';

interface FlightSearchProps {
  search?: FlightListingsParams;
}

export function FlightListings({ search }: FlightSearchProps) {
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const { data: airports } = useAirports();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useFlightListings(search);

  const flightListings = useMemo(
    () => data?.pages.flatMap((page) => page.flightOffer) ?? [],
    [data],
  );

  const totalFlightCount = data?.pages[0]?.resultSet.count ?? 0;

  const airportByCode = useMemo(
    () =>
      new Map(
        airports?.map((airport) => [
          airport.ItemName,
          `${airport.AirportName} (${airport.ItemName})`,
        ]),
      ),
    [airports],
  );

  const rowVirtualizer = useVirtualizer({
    count: flightListings.length,
    estimateSize: () => 156,
    getScrollElement: () => scrollParentRef.current,
    overscan: 4,
  });

  const virtualItems = rowVirtualizer.getVirtualItems();
  const lastVirtualItem = virtualItems.at(-1);

  useEffect(() => {
    if (
      lastVirtualItem &&
      lastVirtualItem.index >= flightListings.length - 4 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      void fetchNextPage();
    }
  }, [
    fetchNextPage,
    flightListings.length,
    hasNextPage,
    isFetchingNextPage,
    lastVirtualItem,
  ]);

  if (!search) return null;

  if (isLoading) {
    return (
      <section className="rounded-md border border-gray-300 bg-white p-6 text-gray-950 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50" role="status">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Finding flights...
        </p>
      </section>
    );
  }

  if (isError) {
    return (
      <section role="alert" className="rounded-md border border-red-300 bg-white p-6 text-red-700 shadow-sm dark:border-red-700 dark:bg-gray-800 dark:text-red-300">
        <p>Unable to load flight listings.</p>
      </section>
    );
  }

  if (flightListings.length === 0) {
    return (
      <section className="rounded-md border border-gray-300 bg-white p-6 text-gray-950 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
        <h2 className="text-lg font-semibold">No flights found</h2>
      </section>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold">Available flights</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {flightListings.length} result{flightListings.length === 1 ? '' : 's'}
          {totalFlightCount > flightListings.length &&
            ` of ${totalFlightCount}`}
        </p>
      </div>

      <div
        ref={scrollParentRef}
        className="h-160 overflow-auto rounded-md focus:outline-none"
      >
        <div
          className="relative w-full"
          style={{ height: rowVirtualizer.getTotalSize() }}
        >
          {virtualItems.map((virtualItem) => {
            const flight = flightListings[virtualItem.index];

            if (!flight) return null;

            return (
              <article
                key={flight.outboundFlight.id}
                ref={rowVirtualizer.measureElement}
                data-index={virtualItem.index}
                className="absolute top-0 left-0 grid w-full gap-4 rounded-md border border-gray-300 bg-white p-4 text-gray-950 shadow-sm md:grid-cols-[1fr_auto] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                style={{ transform: `translateY(${virtualItem.start}px)` }}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">
                    {airportByCode.get(
                      flight.outboundFlight.departureAirport.locationCode,
                    ) ??
                      flight.outboundFlight.departureAirport.locationCode}
                      {' to '}
                    {airportByCode.get(
                      flight.outboundFlight.arrivalAirport.locationCode,
                    ) ?? flight.outboundFlight.arrivalAirport.locationCode}
                  </h3>

                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {dateTimeFormatter.format(
                      new Date(flight.outboundFlight.departureDateTime),
                    )}{' '}
                    -{' '}
                    {dateTimeFormatter.format(
                      new Date(flight.outboundFlight.arrivalDateTime),
                    )}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {flight.outboundFlight.marketingAirline.companyShortName}{' '}
                    {flight.outboundFlight.flightNumber} -{' '}
                    {flight.pricingInfoSum.productClass}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                  <p className="text-xl font-semibold">
                    {formatPrice(
                      flight.pricingInfoSum.totalPriceAllPassengers,
                      flight.pricingInfoSum.currencyCode,
                    )}
                  </p>

                  <a href={flight.deeplink.href} aria-label={`View flight details`}>
                    <Button asDiv title='View' />
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {isFetchingNextPage && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Loading more flights...
        </p>
      )}
    </section>
  );
}
