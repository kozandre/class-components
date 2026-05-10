import { render, screen } from '@testing-library/react';

import { beforeEach, describe, expect, it, vi } from 'vitest';

import { ErrorBoundary } from './error-boundary';

const BuggyComponent = () => {
  throw new Error('Test error from buggy component');
};

const SafeComponent = () => <div>Safe component</div>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <SafeComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Safe component')).toBeInTheDocument();
  });

  it('renders fallback UI when error occurs', () => {
    render(
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Application Error/i)).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const onError = vi.fn();
    render(
      <ErrorBoundary onError={onError}>
        <BuggyComponent />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError.mock.calls[0][0]).toBeInstanceOf(Error);
    expect(onError.mock.calls[0][0].message).toBe(
      'Test error from buggy component'
    );
  });
});
