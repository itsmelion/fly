import { render, screen } from '@testing-library/react';

import { Select } from './select';

describe('Select', () => {
  it('renders a labelled select trigger with the selected value', () => {
    const { asFragment } = render(
      <Select.Root value="ams">
        <Select.Trigger aria-label="Origin airport">
          <Select.Value placeholder="Select airport" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Label>Airports</Select.Label>
            <Select.Item value="ams">Amsterdam (AMS)</Select.Item>
            <Select.Item value="fnc">Funchal (FNC)</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>,
    );

    expect(screen.getByRole('combobox', { name: 'Origin airport' })).toBeTruthy();
    expect(screen.getByText('Amsterdam (AMS)')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});
