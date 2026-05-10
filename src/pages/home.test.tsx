import { itemsApi } from '@services/api';

import { searchStorage } from '@services/storage';

import { render, screen, waitFor } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import Home from './home';

import type { ResultsSectionProps } from '@/features/results/results.types';

vi.mock('@services/storage', () => ({
  searchStorage: {
    get: vi.fn(),
    save: vi.fn(),
    clear: vi.fn(),
  },
}));

vi.mock('@services/api', () => ({
  itemsApi: {
    getAll: vi.fn(),
    search: vi.fn(),
  },
}));

vi.mock('@features/search', () => ({
  SearchControls: ({ onSearch }: { onSearch: (term: string) => void }) => (
    <div data-testid="mock-search-controls">
      <button onClick={() => onSearch('Luke Skywalker')}>Mock Search</button>
    </div>
  ),
}));

vi.mock('@features/results', () => ({
  ResultsSection: ({ items, loading, error }: ResultsSectionProps) => (
    <div data-testid="mock-results-section">
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {items.length > 0 && <div>Items count: {items.length}</div>}
    </div>
  ),
}));

vi.mock('@features/error-handling', () => ({
  ErrorTestButton: () => (
    <button data-testid="mock-error-button">Test Error</button>
  ),
}));

describe('Home page', () => {
  const mockItems = [
    { id: '1', name: 'Luke Skywalker', description: 'Jedi Knight' },
    { id: '2', name: 'Darth Vader', description: 'Dark Lord' },
  ];

  describe('Initial Load', () => {
    it('loads all items when no saved search term exists', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue(mockItems);

      render(<Home />);

      await waitFor(() => {
        expect(itemsApi.getAll).toHaveBeenCalledTimes(1);
      });

      expect(screen.getByText('Items count: 2')).toBeInTheDocument();
    });

    it('loads saved search results when search term exists', async () => {
      vi.mocked(searchStorage.get).mockReturnValue('Luke Skywalker');
      vi.mocked(itemsApi.search).mockResolvedValue([mockItems[0]]);

      render(<Home />);

      await waitFor(() => {
        expect(itemsApi.search).toHaveBeenCalledWith('Luke Skywalker');
      });

      expect(screen.getByText('Items count: 1')).toBeInTheDocument();
    });

    it('shows loading state during initial load', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockImplementation(
        () =>
          new Promise((resolve) => setTimeout(() => resolve(mockItems), 100))
      );

      render(<Home />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Items count: 2')).toBeInTheDocument();
      });
    });

    it('handles API error during initial load', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockRejectedValue(new Error('API Error'));

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText(/failed to load items/i)).toBeInTheDocument();
      });
    });
  });

  describe('Search Functionality', () => {
    it('performs search when SearchControls triggers onSearch', async () => {
      const user = userEvent.setup();
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue(mockItems);
      vi.mocked(itemsApi.search).mockResolvedValue([mockItems[0]]);

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Items count: 2')).toBeInTheDocument();
      });

      const searchButton = screen.getByRole('button', { name: /mock search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(itemsApi.search).toHaveBeenCalledWith('Luke Skywalker');
        expect(screen.getByText('Items count: 1')).toBeInTheDocument();
      });
    });

    it('shows loading state during search', async () => {
      const user = userEvent.setup();
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue(mockItems);
      vi.mocked(itemsApi.search).mockImplementation(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve([mockItems[0]]), 100)
          )
      );

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Items count: 2')).toBeInTheDocument();
      });

      const searchButton = screen.getByRole('button', { name: /mock search/i });
      await user.click(searchButton);

      expect(screen.getByText('Loading...')).toBeInTheDocument();

      await waitFor(() => {
        expect(screen.getByText('Items count: 1')).toBeInTheDocument();
      });
    });

    it('handles search error', async () => {
      const user = userEvent.setup();
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue(mockItems);
      vi.mocked(itemsApi.search).mockRejectedValue(new Error('Search failed'));

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Items count: 2')).toBeInTheDocument();
      });

      const searchButton = screen.getByRole('button', { name: /mock search/i });
      await user.click(searchButton);

      await waitFor(() => {
        expect(screen.getByText(/search failed/i)).toBeInTheDocument();
      });
    });
  });

  describe('Component Rendering', () => {
    it('renders all main components', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue([]);

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('mock-search-controls')).toBeInTheDocument();
      });
      expect(screen.getByTestId('mock-results-section')).toBeInTheDocument();
      expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
    });

    it('displays the title', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue([]);

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Star Wars Explorer')).toBeInTheDocument();
      });
    });
  });

  describe('Error Boundary Integration', () => {
    it('renders ErrorTestButton', async () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);
      vi.mocked(itemsApi.getAll).mockResolvedValue([]);

      render(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('mock-error-button')).toBeInTheDocument();
      });
    });
  });
});
