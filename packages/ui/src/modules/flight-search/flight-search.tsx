'use client';
import { useAirports } from '@fly/services';
import { SubmitHandler, useForm } from 'react-hook-form';

import { DatePicker } from '../../lib/inputs/date-picker/date-picker';
import { Label } from '../../lib/inputs/label/label';
import { Select } from '../../lib/inputs/select/select';

type Inputs = {
  origin: string;
  destination: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
};

export function FlightSearch() {
  const { data: airports } = useAirports();
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className="flight-search flex flex-row flex-wrap justify-center gap-6 p-4">
      <fieldset className="relative">
        <Select.Root>
          <Label htmlFor="origin">Origin</Label>

          <Select.Trigger className="w-full max-w-48">
            <Select.Value placeholder="Origin" />
          </Select.Trigger>

          <Select.Content>
            {airports?.map((airport) => (
              <Select.Item key={airport.ItemName} value={airport.ItemName}>
                {airport.AirportName} - ({airport.ItemName})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </fieldset>

      <fieldset className="relative">
        <Select.Root>
          <Label htmlFor="destination">Destination</Label>

          <Select.Trigger className="w-full max-w-48">
            <Select.Value placeholder="Destination" />
          </Select.Trigger>

          <Select.Content>
            {airports?.map((airport) => (
              <Select.Item key={airport.ItemName} value={airport.ItemName}>
                {airport.AirportName} - ({airport.ItemName})
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </fieldset>

      <DatePicker id="departure-date-picker" mode="range" label="Departure Date" />
    </div>
    </form>
  );
}
