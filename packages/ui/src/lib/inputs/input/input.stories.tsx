import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Input } from './input';

const meta = {
  component: Input,
  title: 'Lib/Inputs/Input',
  args: {
    id: 'origin',
    label: 'Origin',
    placeholder: 'Airport or city',
    info: 'Use the airport code when you know it.',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const WithError = {
  args: {
    error: 'Origin is required.',
  },
} satisfies Story;
