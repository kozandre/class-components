import { render, screen } from '@testing-library/react';

import { describe, expect, it } from 'vitest';

import ItemCard from './item-card';

describe('Item Card Component', () => {
  it('renders item name and description', () => {
    const mockItem = {
      id: '1',
      name: 'Luke Skywalker',
      description: 'Jedi Knight from Tatooine',
    };

    render(<ItemCard item={mockItem} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();

    expect(screen.getByText('Jedi Knight from Tatooine')).toBeInTheDocument();
  });

  it('handles missing description gracefully', () => {
    const itemWithoutDesc = {
      id: '2',
      name: 'Darth Vader',
      description: '',
    };

    render(<ItemCard item={itemWithoutDesc} />);

    expect(screen.getByText('Darth Vader')).toBeInTheDocument();

    const descriptionElement = screen
      .getByTestId('item-card')
      .querySelector('p');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent('');
  });
});
