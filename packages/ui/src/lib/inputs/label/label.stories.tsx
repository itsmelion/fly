import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Label } from './label';

const meta = {
  component: Label,
  title: 'Lib/Inputs/Label',
  args: {
    children: 'Destination',
    htmlFor: 'destination',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
