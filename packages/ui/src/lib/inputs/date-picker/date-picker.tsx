'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { Calendar, CalendarProps } from '../../calendar/calendar-wrapper';
import { Form } from '../info/info';
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
  mode?: CalendarProps['mode'];
  calendarProps?: Omit<
    CalendarProps,
    'mode' | 'numberOfMonths' | 'selected' | 'onSelect'
  >;
}

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  month: 'short',
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
  calendarProps,
}: DatePickerProps) {
  return (
    <fieldset className={twMerge('relative contents', className)}>
      <div>
        <Label htmlFor={id}>{label}</Label>

        {info && <Form.Info className="mt-1">{info}</Form.Info>}

        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger asChild>
            <button
              id={id}
              type="button"
              disabled={disabled}
              className={twMerge(
                'flex h-10 w-full min-w-48 items-center justify-start rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm text-black shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4 text-current" />
              {date ? dateFormatter.format(date) : placeholder}
            </button>
          </PopoverPrimitive.Trigger>

          <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
              align="start"
              className="z-50 rounded-md border border-gray-200 bg-white p-0 text-gray-950 shadow-md outline-none"
            >
              <Calendar
                {...calendarProps}
                mode={mode as 'single'}
                numberOfMonths={2}
                selected={date}
                onSelect={onDateChange}
              />
            </PopoverPrimitive.Content>
          </PopoverPrimitive.Portal>
        </PopoverPrimitive.Root>

        {error && <Form.Error className="mt-1">{error}</Form.Error>}
      </div>
    </fieldset>
  );
}
