'use client';
import { useAirports } from '@fly/services';
import { useState } from 'react';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';

import { DatePicker } from '../../lib/inputs/date-picker/date-picker';
import { Label } from '../../lib/inputs/label/label';
import { Select } from '../../lib/inputs/select/select';
import { FlightListings } from '../../modules/flight-search/flight-listings';

type Inputs = {
  origin: string;
  destination: string;
  dates: Date | undefined;
};

export function FlightSearch() {
  const { data: airports } = useAirports();
  const { control, handleSubmit } = useForm<Inputs>();
  const [values, setFormSubmission] = useState<Inputs | null>(null);
  const onSubmit: SubmitHandler<Inputs> = (data) => setFormSubmission(data);

  return (
    <main className="flex min-h-screen flex-col">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flight-search flex flex-row flex-wrap justify-center gap-6 p-4">
          <Controller
            name="origin"
            control={control}
            render={({ field, fieldState }) => (
              <fieldset className="relative">
                <Label htmlFor="origin">Origin</Label>

                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger
                    id="origin"
                    ref={field.ref}
                    className="w-full max-w-48"
                  >
                    <Select.Value placeholder="Origin" />
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
                  <p className="mt-1 text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />

          <Controller
            name="destination"
            control={control}
            render={({ field, fieldState }) => (
              <fieldset className="relative">
                <Label htmlFor="destination">Destination</Label>

                <Select.Root value={field.value} onValueChange={field.onChange}>
                  <Select.Trigger
                    id="destination"
                    ref={field.ref}
                    className="w-full max-w-48"
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
                  <p className="mt-1 text-sm text-red-600">
                    {fieldState.error.message}
                  </p>
                )}
              </fieldset>
            )}
          />

          <Controller
            name="dates"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                id="dates"
                label="Departure"
                date={field.value}
                onDateChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <button
            className="inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            type="submit"
          >
            Search Flights
          </button>
        </div>
      </form>

      <FlightListings {...values} />
    </main>
  );
}
