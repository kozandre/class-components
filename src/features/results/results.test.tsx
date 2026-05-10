import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { ResultsSection } from './results-section';

vi.mock('@features/items', () => ({
  ItemList: () => <div data-testid="item-list">Item List</div>,
}));

vi.mock('@features/ui', () => ({
  LoadingSpinner: () => <div data-testid="loading-spinner">Loading...</div>,
}));

describe('ResultsSection', () => {
  const mockItems = [{ id: '1', name: 'Luke', description: 'Jedi' }];

  it('shows loading spinner when loading is true', () => {
    render(<ResultsSection items={[]} loading error={null} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('shows error message when error is provided', () => {
    render(<ResultsSection items={[]} error="Test error" />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('shows ItemList when not loading and no error', () => {
    render(<ResultsSection items={mockItems} error={null} />);
    expect(screen.getByTestId('item-list')).toBeInTheDocument();
  });

  it('always shows Results title', () => {
    render(<ResultsSection items={[]} loading error={null} />);
    expect(screen.getByText('Results')).toBeInTheDocument();
  });
});
