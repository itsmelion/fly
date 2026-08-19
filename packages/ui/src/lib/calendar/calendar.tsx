'use client';

import { DayPicker } from '@daypicker/react';
import { twMerge } from 'tailwind-merge';
import '@daypicker/react/style.css'

export type CalendarProps = React.ComponentProps<typeof DayPicker> & { mode?: 'single' | 'multiple' | 'range' };

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={{ from: new Date(2022, 11, 10), to: new Date(2022, 11, 30) }}
      className={twMerge('p-3', className)}
      classNames={{
        // months: 'flex flex-col gap-4 sm:flex-row',
        // month: 'space-y-4',
        // month_caption: 'flex h-7 items-center justify-center text-sm font-medium',
        // nav: 'flex items-center gap-1',
        // button_previous:
        //   'absolute left-3 top-3 h-7 w-7 rounded-md border border-gray-300 bg-white p-0 text-gray-700 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        // button_next:
        //   'absolute right-3 top-3 h-7 w-7 rounded-md border border-gray-300 bg-white p-0 text-gray-700 opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        // month_grid: 'w-full border-collapse space-y-1',
        // weekdays: 'flex',
        // weekday: 'w-9 rounded-md text-[0.8rem] font-normal text-gray-500',
        // week: 'mt-2 flex w-full',
        // day: 'relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20',
        // day_button:
        //   'h-9 w-9 rounded-md p-0 font-normal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500',
        // selected:
        //   'bg-blue-600 text-white hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white',
        // today: 'bg-gray-100 text-gray-950',
        // outside: 'text-gray-400 opacity-50',
        // disabled: 'text-gray-400 opacity-50',
        // range_middle: 'aria-selected:bg-gray-100 aria-selected:text-gray-950',
        // hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  );
}
