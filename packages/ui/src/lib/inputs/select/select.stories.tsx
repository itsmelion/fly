import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Select } from './select';

function SelectExample() {
  const [value, setValue] = useState('ams');

  return (
    <div className="max-w-sm">
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger aria-label="Origin airport">
          <Select.Value placeholder="Select airport" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Airports</Select.Label>
            <Select.Item value="ams">Amsterdam (AMS)</Select.Item>
            <Select.Item value="fnc">Funchal (FNC)</Select.Item>
            <Select.Item value="cta">Catania (CTA)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}

const meta = {
  title: 'Lib/Inputs/Select',
  render: () => <SelectExample />,
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
