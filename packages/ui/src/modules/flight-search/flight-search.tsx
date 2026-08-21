'use client';

import { useAirports, type FlightListingsParams } from '@fly/services';
import { Suspense, useMemo, useState } from 'react';
import { ErrorBoundary, getErrorMessage } from "react-error-boundary";
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';

import { formatDateForSearch } from './helpers/formatDate';
import { Button } from '../../lib/button/button';
import { DatePicker } from '../../lib/inputs/date-picker/date-picker';
import { Label } from '../../lib/inputs/label/label';
import { Select } from '../../lib/inputs/select/select';
import { ErrorPanel } from '../../lib/panels/error-panel';
import { InfoPanel } from '../../lib/panels/info-panel';
import { FlightListings } from '../flight-listings/flight-listings';

type Inputs = {
  origin: string;
  destination: string | undefined;
  departureDate: Date | undefined;
};

const minimumDepartureDate = new Date(2022, 10, 10);
const maximumDepartureDate = new Date(2022, 10, 30);

export function FlightSearch() {
  const { data: airports, isLoading: airportsAreLoading } = useAirports();
  const { control, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      origin: 'AMS',
      destination: undefined,
      departureDate: undefined,
    },
  });
  const [search, setSearch] = useState<FlightListingsParams>();
  const originAirports = useMemo(
    () => airports?.filter((airport) => airport.ItemName === 'AMS') ?? [],
    [airports],
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (!data.destination || !data.departureDate) {
      return;
    }

    setSearch({
      origin: data.origin,
      destination: data.destination,
      departureDate: formatDateForSearch(data.departureDate),
    });
  };

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-4 py-8">
        <Suspense fallback={<InfoPanel>Loading</InfoPanel>}>
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <ErrorPanel role="alert">
                <p>Something went wrong:</p>
                <pre>{getErrorMessage(error)}</pre>
                <Button onClick={resetErrorBoundary}>Try again</Button>
              </ErrorPanel>
            )}>
          <section className="rounded-md border border-gray-300 bg-white p-4 text-gray-950 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid items-end gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto_auto]">
                <Controller
                  name="origin"
                  control={control}
                  rules={{ required: 'Choose an origin.' }}
                  render={({ field, fieldState }) => (
                    <fieldset className="relative min-w-0">
                      <Label htmlFor="origin">Origin</Label>

                      <Select.Root
                        value={field.value ?? ''}
                        onValueChange={field.onChange}
                        disabled={airportsAreLoading}
                      >
                        <Select.Trigger
                          id="origin"
                          ref={field.ref}
                          className="w-full"
                        >
                          <Select.Value placeholder="Origin" />
                        </Select.Trigger>

                        <Select.Content>
                          {originAirports.map((airport) => (
                            <Select.Item
                              key={airport.ItemName}
                              value={airport.ItemName}
                            >
                              {airport.AirportName} ({airport.ItemName})
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>

                      {fieldState.error && (
                        <p role='alert' className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </fieldset>
                  )}
                />

                <Controller
                  name="destination"
                  control={control}
                  rules={{ required: 'Choose a destination.' }}
                  render={({ field, fieldState }) => (
                    <fieldset className="relative min-w-0">
                      <Label htmlFor="destination">Destination</Label>

                      <Select.Root
                        value={field.value ?? ''}
                        onValueChange={field.onChange}
                        disabled={airportsAreLoading}
                      >
                        <Select.Trigger
                          id="destination"
                          ref={field.ref}
                          className="w-full"
                        >
                          <Select.Value placeholder="Destination" />
                        </Select.Trigger>

                        <Select.Content>
                          {airports?.map((airport) => (
                            <Select.Item
                              key={airport.ItemName}
                              value={airport.ItemName}
                            >
                              {airport.AirportName} ({airport.ItemName})
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Root>

                      {fieldState.error && (
                        <p role='alert' className="mt-1 text-sm text-red-600">
                          {fieldState.error.message}
                        </p>
                      )}
                    </fieldset>
                  )}
                />

                <Controller
                  name="departureDate"
                  control={control}
                  rules={{ required: 'Choose a departure date.' }}
                  render={({ field, fieldState }) => (
                    <DatePicker
                      id="departureDate"
                      label="Departure date"
                      date={field.value}
                      onDateChange={field.onChange}
                      error={fieldState.error?.message}
                      calendarProps={{
                        defaultMonth: minimumDepartureDate,
                        disabled: [
                          { before: minimumDepartureDate },
                          { after: maximumDepartureDate },
                        ],
                        startMonth: minimumDepartureDate,
                        endMonth: maximumDepartureDate,
                      }}
                    />
                  )}
                />

                <Button
                  type="submit"
                  disabled={airportsAreLoading}
                  title='Search'
                />
              </div>
            </form>
          </section>

          <FlightListings search={search} />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
