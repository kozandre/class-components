import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { FallbackUI } from './fallback-ui';

describe('FallbackUI', () => {
  it('renders error message when error is provided', () => {
    const error = new Error('Test error message');
    render(<FallbackUI error={error} />);

    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('renders default message when no error provided', () => {
    render(<FallbackUI />);

    expect(screen.getByText('Application Error')).toBeInTheDocument();
    expect(
      screen.getByText('An unexpected error occurred in the application')
    ).toBeInTheDocument();
  });

  it('calls resetError when Try Again button is clicked', async () => {
    const user = userEvent.setup();
    const mockReset = vi.fn();

    render(<FallbackUI resetError={mockReset} />);

    const button = screen.getByRole('button', { name: 'Reload Application' });
    await user.click(button);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
