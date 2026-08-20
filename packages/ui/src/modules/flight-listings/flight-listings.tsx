'use client';

import {
  useAirports,
  useFlightListings,
  type FlightListingsParams,
} from '@fly/services';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef } from 'react';

import { FlightOffer } from '../../lib/flight-offer/flight-offer';
import { FlightOfferCard } from '../../lib/flight-offer/flight-offer-card';
import { ErrorPanel } from '../../lib/panels/error-panel';
import { InfoPanel } from '../../lib/panels/info-panel';

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
      <InfoPanel role="status">
        Finding flights...
      </InfoPanel>
    );
  }

  if (isError) {
    return (
      <ErrorPanel role="alert">
        Unable to load flight listings.
      </ErrorPanel>
    );
  }

  if (flightListings.length === 0) {
    return (
      <InfoPanel>
        No flights found
      </InfoPanel>
    );
  }

  return (
    <section className="space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="text-xl font-semibold">Available flights</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {flightListings.length} result{flightListings.length === 1 ? '' : 's'}
          {totalFlightCount > flightListings.length && ` of ${totalFlightCount}`}
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
              <FlightOfferCard
                key={flight.outboundFlight.id}
                index={virtualItem.index}
                measureElement={rowVirtualizer.measureElement}
                start={virtualItem.start}
              >
                <FlightOffer
                  flight={flight}
                  getAirportLabel={(code) => airportByCode.get(code)}
                />
              </FlightOfferCard>
            );
          })}
        </div>
      </div>

      {isFetchingNextPage && (
        <p className="text-sm text-black/82 dark:text-white/82">
          Loading more flights...
        </p>
      )}
    </section>
  );
}
