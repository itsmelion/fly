'use client';
import { useAirports, useFlightListings } from '@fly/services';

interface FlightSearchProps {
  origin?: string;
  destination?: string;
  dates?: Date;
}

export function FlightListings({
  origin,
  destination,
  dates,
}: FlightSearchProps) {
  const { data: airports } = useAirports();
  const { data: flightListings } = useFlightListings({
    origin,
    destination,
    dates,
  });

  return (
    <div className="flight-search flex flex-row flex-wrap justify-center gap-6 p-4">
      {flightListings?.map((flight) => (
        <div
          key={flight.outboundFlight.id}
          className="flight-listing rounded-md border p-4 shadow-lg"
        >
          <h3 className="text-lg font-semibold">
            {flight.outboundFlight.departureAirport.locationCode}
          </h3>
          <h3 className="text-lg font-semibold">
            {flight.outboundFlight.arrivalAirport.locationCode}
          </h3>
        </div>
      ))}
    </div>
  );
}
