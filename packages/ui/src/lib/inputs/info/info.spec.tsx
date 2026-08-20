import { render, screen } from '@testing-library/react';

import { Form } from './info';

describe('Form info labels', () => {
  it('renders helper text', () => {
    const { asFragment } = render(
      <Form.Info>Use the airport code when you know it.</Form.Info>,
    );

    expect(screen.getByText('Use the airport code when you know it.')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders error feedback as an alert', () => {
    const { asFragment } = render(<Form.Error>Origin is required.</Form.Error>);

    expect(screen.getByRole('alert').textContent).toBe('Origin is required.');
    expect(asFragment()).toMatchSnapshot();
  });
});
