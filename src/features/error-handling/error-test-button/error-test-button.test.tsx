import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorTestButton } from './error-test-button';

import { ErrorBoundary } from '../error-boundary/error-boundary';

describe('ErrorTestButton', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders button correctly', () => {
    render(<ErrorTestButton />);
    expect(
      screen.getByRole('button', { name: 'Test Error Button' })
    ).toHaveTextContent('Test Error Button');
  });

  it('triggers error boundary when clicked', async () => {
    const user = userEvent.setup();

    render(
      <ErrorBoundary>
        <ErrorTestButton />
      </ErrorBoundary>
    );

    const button = screen.getByRole('button', { name: 'Test Error Button' });
    await user.click(button);

    expect(screen.getByText(/application error/i)).toBeInTheDocument();
  });
});
