import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Loader } from '../loader/loader';

const meta = {
  component: Loader,
  title: 'Lib/Loader',
} satisfies Meta<typeof Loader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
