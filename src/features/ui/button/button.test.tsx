import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import Button from './button';

describe('Button Component', () => {
  it('renders button with default text', () => {
    render(<Button />);
    const buttonElement = screen.getByRole('button', { name: 'Click' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click');
  });
});
