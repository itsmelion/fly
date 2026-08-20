import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ErrorPanel } from './error-panel';

const meta = {
  title: 'Lib/Panels/ErrorPanel',
  component: ErrorPanel,
  args: {
    children: 'We could not load matching flights.',
  },
} satisfies Meta<typeof ErrorPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
