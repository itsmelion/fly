'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Calendar, CalendarProps } from '../../calendar/calendar-wrapper';
import { Label } from '../label/label';

export interface DatePickerProps {
  id: string;
  label: string;
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  info?: string;
  error?: string;
  mode: CalendarProps['mode'];
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export function DatePicker({
  id,
  label,
  date,
  onDateChange,
  placeholder = 'Pick a date',
  disabled,
  className,
  info,
  error,
  mode = 'single',
}: DatePickerProps) {
  return (
    <fieldset className={twMerge('relative contents', className)}>
      <div>
      <Label htmlFor={id}>{label}</Label>

      {info && <p className="mt-1 text-sm text-gray-500">{info}</p>}

      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <button
            id={id}
            type="button"
            disabled={disabled}
            className={twMerge(
              'flex h-10 w-full items-center justify-start min-w-48 rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50',
              !date && 'text-gray-500'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
            {date ? dateFormatter.format(date) : placeholder}
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="start"
            className="z-50 rounded-md border border-gray-200 bg-white p-0 text-gray-950 shadow-md outline-none"
          >
            <Calendar
              mode={mode}
              numberOfMonths={2}
              selected={date}
              onSelect={onDateChange}
            />
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </fieldset>
  );
}
