import { render, screen } from '@testing-library/react';

import { describe, expect, it, vi } from 'vitest';

import { ItemList } from './item-list';

import type { Item } from '../item.types';

vi.mock('../item-card', () => ({
  ItemCard: ({ item }: { item: Item }) => (
    <div data-testid="mock-item-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
    </div>
  ),
}));

describe('ItemList', () => {
  it('renders all items', () => {
    const mockItems: Item[] = [
      { id: '1', name: 'Luke Skywalker', description: 'Jedi Knight' },
    ];

    render(<ItemList items={mockItems} />);

    const heading = screen.getByRole('heading', { level: 3 });
    const paragraph = screen.getByText('Jedi Knight');

    expect(heading).toHaveTextContent('Luke Skywalker');
    expect(paragraph).toBeInTheDocument();
  });

  it('renders correct number of items', () => {
    const mockItems: Item[] = [
      { id: '1', name: 'Luke Skywalker', description: 'Jedi Knight' },
      { id: '2', name: 'Darth Vader', description: 'Dark Lord' },
      { id: '3', name: 'Yoda', description: 'Jedi Master' },
    ];

    render(<ItemList items={mockItems} />);

    const items = screen.getAllByTestId('mock-item-card');
    expect(items).toHaveLength(3);
  });
});
