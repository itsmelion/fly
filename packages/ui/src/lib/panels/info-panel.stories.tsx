import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { InfoPanel } from './info-panel';

const meta = {
  title: 'Lib/Panels/InfoPanel',
  component: InfoPanel,
  args: {
    children: 'Search for a route to compare fares.',
  },
} satisfies Meta<typeof InfoPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
