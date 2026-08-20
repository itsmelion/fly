import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Calendar } from './calendar';

const meta = {
  component: Calendar,
  title: 'Lib/Calendar',
  args: {
    mode: 'single',
    month: new Date(2026, 0, 1),
    selected: new Date(2026, 0, 15),
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const SingleMonth = {} satisfies Story;

export const TwoMonths = {
  args: {
    numberOfMonths: 2,
  },
} satisfies Story;
