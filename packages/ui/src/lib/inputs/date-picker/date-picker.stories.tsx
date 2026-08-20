import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { DatePicker, type DatePickerProps } from './date-picker';

function StatefulDatePicker(args: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(args.date);

  return (
    <div className="max-w-sm">
      <DatePicker {...args} date={date} onDateChange={setDate} />
    </div>
  );
}

const meta = {
  component: DatePicker,
  title: 'Lib/Inputs/DatePicker',
  args: {
    id: 'departure-date',
    label: 'Departure date',
    placeholder: 'Pick departure',
    date: new Date(2026, 0, 15),
    info: 'Choose the first day of travel.',
    calendarProps: {
      month: new Date(2026, 0, 1),
    },
  },
  render: (args) => <StatefulDatePicker {...args} />,
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithError = {
  args: {
    date: undefined,
    error: 'Departure date is required.',
  },
} satisfies Story;
