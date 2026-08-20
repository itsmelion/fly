import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Form } from './info';

const meta = {
  title: 'Lib/Inputs/Info',
  component: Form.Info,
  args: {
    children: 'Use the airport code when you know it.',
  },
} satisfies Meta<typeof Form.Info>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Info = {} satisfies Story;

export const Error = {
  render: (args) => <Form.Error {...args} />,
  args: {
    children: 'Origin is required.',
  },
} satisfies Story;
