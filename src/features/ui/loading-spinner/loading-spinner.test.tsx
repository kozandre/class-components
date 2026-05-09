import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import LoadingSpinner from './loading-spinner';

describe('Loading Spinner Component', () => {
  it('renders loading spinner', () => {
    render(<LoadingSpinner />);
    const spinnerElement = screen.getByLabelText('Loading');
    expect(spinnerElement).toBeInTheDocument();
  });
});
