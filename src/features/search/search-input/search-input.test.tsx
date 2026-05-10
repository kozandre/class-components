import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';

import { describe, expect, it, vi } from 'vitest';

import { SearchInput } from './search-input';

vi.mock('../search-icon', () => ({
  SearchIcon: () => <svg data-testid="search-icon" />,
}));

describe('SearchInput', () => {
  const defaultProps = {
    value: '',
    onChange: vi.fn(),
    onSearch: vi.fn(),
    placeholder: 'Search...',
  };

  it('renders input with correct value', () => {
    render(<SearchInput {...defaultProps} value="Luke Skywalker" />);
    expect(screen.getByRole('searchbox', { name: 'Search' })).toHaveValue(
      'Luke Skywalker'
    );
  });

  it('calls onChange when user types', async () => {
    const user = userEvent.setup();

    render(<SearchInput {...defaultProps} />);

    await user.type(screen.getByRole('searchbox', { name: 'Search' }), 'Luke');
    expect(defaultProps.onChange).toHaveBeenCalledTimes(4);
  });

  it('calls onSearch when Enter key is pressed', async () => {
    const user = userEvent.setup();
    render(<SearchInput {...defaultProps} value="Yoda" onChange={vi.fn()} />);

    await user.type(screen.getByRole('searchbox'), '{Enter}');

    expect(defaultProps.onSearch).toHaveBeenCalledTimes(1);
  });

  it('renders search icon', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<SearchInput {...defaultProps} />);
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
  });
});
