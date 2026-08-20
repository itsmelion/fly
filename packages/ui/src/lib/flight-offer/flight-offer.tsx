import type { FlightOffer as FlightOfferData } from '@fly/services';

import { Button } from '../button/button';
import { dateTimeFormatter, formatPrice } from './helpers/formatters';

interface FlightOfferProps {
  flight: FlightOfferData;
  getAirportLabel: (code: string) => string | undefined;
}

export function FlightOffer({ flight, getAirportLabel }: FlightOfferProps) {
  const departureCode = flight.outboundFlight.departureAirport.locationCode;
  const arrivalCode = flight.outboundFlight.arrivalAirport.locationCode;
  const departureAirport = getAirportLabel(departureCode) ?? departureCode;
  const arrivalAirport = getAirportLabel(arrivalCode) ?? arrivalCode;

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">
          {departureAirport}
          {' to '}
          {arrivalAirport}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {dateTimeFormatter.format(
            new Date(flight.outboundFlight.departureDateTime),
          )}
          {' - '}
          {dateTimeFormatter.format(
            new Date(flight.outboundFlight.arrivalDateTime),
          )}
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {flight.outboundFlight.marketingAirline.companyShortName}
          {' '}
          {flight.outboundFlight.flightNumber}
          {' - '}
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

        <a href={flight.deeplink.href} aria-label="View flight details">
          <Button asDiv title="View" />
        </a>
      </div>
    </>
  );
}
