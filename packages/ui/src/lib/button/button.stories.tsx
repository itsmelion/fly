import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button, type ButtonProps } from './button';

const meta = {
  component: Button,
  title: 'Lib/Button',
  args: {
    title: 'Click me'
  },
} satisfies Meta<ButtonProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
