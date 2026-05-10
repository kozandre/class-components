import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import { SearchIcon } from './search-icon';

describe('SearchIcon Component', () => {
  it('renders search icon with default class when no class prop provided', () => {
    render(<SearchIcon />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('h-5', 'w-5', 'text-gray-400');
  });

  it('renders search icon with custom class when provided', () => {
    render(<SearchIcon class="custom-class" />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('custom-class');
  });

  it('renders with correct svg attributes', () => {
    render(<SearchIcon class="custom-class" />);
    const icon = screen.getByTestId('search-icon');
    expect(icon).toHaveAttribute('fill', 'none');
    expect(icon).toHaveAttribute('stroke', 'currentColor');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });
});
