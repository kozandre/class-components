import { Component } from 'react';

import ItemCard from '../item-card/item-card';

import type { ItemListProps } from '../item.types';

class ItemList extends Component<ItemListProps> {
  render() {
    const { items } = this.props;

    if (items.length === 0) {
      return (
        <p className="py-12 text-center text-gray-500">
          No items found. Try a different search term.
        </p>
      );
    }

    return (
      <div className="mm:grid-cols-2 grid gap-4 lg:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    );
  }
}

export default ItemList;
