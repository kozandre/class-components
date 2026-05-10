import { searchStorage } from '@services/storage';

import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { SearchControls } from './search-controls';

vi.mock('@services/storage', () => ({
  searchStorage: {
    get: vi.fn(),
    save: vi.fn(),
    clear: vi.fn(),
  },
}));

describe('Search Controls Component', () => {
  const mockOnSearch = vi.fn();

  describe('Rendering', () => {
    it('renders search input and button', () => {
      render(<SearchControls onSearch={mockOnSearch} />);

      expect(
        screen.getByRole('searchbox', { name: 'Search' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Search' })
      ).toBeInTheDocument();
    });

    it('displays saved search term from localStorage on mount', () => {
      vi.mocked(searchStorage.get).mockReturnValue('Luke Skywalker');

      render(<SearchControls onSearch={mockOnSearch} />);

      expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue(
        'Luke Skywalker'
      );
      expect(searchStorage.get).toHaveBeenCalled();
    });

    it('shows empty input when no saved term exists', () => {
      vi.mocked(searchStorage.get).mockReturnValue(null);

      render(<SearchControls onSearch={mockOnSearch} />);

      expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue('');
    });
  });

  describe('User Interactions', () => {
    it('submits search term when button is clicked', async () => {
      const user = userEvent.setup();
      render(<SearchControls onSearch={mockOnSearch} />);

      await user.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'Luke Skywalker'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(mockOnSearch).toHaveBeenCalledWith('Luke Skywalker');
    });

    it('submits search term when Enter key is pressed', async () => {
      const user = userEvent.setup();
      render(<SearchControls onSearch={mockOnSearch} />);

      await user.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'Darth Vader{Enter}'
      );

      expect(mockOnSearch).toHaveBeenCalledWith('Darth Vader');
    });

    it('trims whitespace from search term', async () => {
      const user = userEvent.setup();
      render(<SearchControls onSearch={mockOnSearch} />);

      await user.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        '  Yoda  '
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(mockOnSearch).toHaveBeenCalledWith('Yoda');
    });

    it('does not make request when search term unchanged', async () => {
      const user = userEvent.setup();
      render(<SearchControls onSearch={mockOnSearch} />);

      const button = screen.getByRole('button', { name: 'Search' });
      await user.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'Luke Skywalker'
      );
      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledTimes(1);

      await user.click(button);

      expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Local Storage Integration', () => {
    it('saves new search term to localStorage', async () => {
      const user = userEvent.setup();
      vi.mocked(searchStorage.get).mockReturnValue(null);
      render(<SearchControls onSearch={mockOnSearch} />);

      await user.type(
        screen.getByRole('searchbox', { name: 'Search' }),
        'Obi-Wan Kenobi'
      );
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(searchStorage.save).toHaveBeenCalledWith('Obi-Wan Kenobi');
    });

    it('does not save to localStorage if term unchanged', async () => {
      const user = userEvent.setup();
      vi.mocked(searchStorage.get).mockReturnValue('Luke Skywalker');
      render(<SearchControls onSearch={mockOnSearch} />);

      const input = screen.getByRole('searchbox', { name: 'Search' });
      await user.clear(input);
      await user.type(input, 'Luke Skywalker');
      await user.click(screen.getByRole('button', { name: 'Search' }));

      expect(searchStorage.save).not.toHaveBeenCalled();
    });
  });
});
