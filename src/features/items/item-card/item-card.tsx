import { Component } from 'react';

import type { ItemCardProps } from '../item.types';

class ItemCard extends Component<ItemCardProps> {
  render() {
    const { name, description } = this.props.item;
    return (
      <div
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
        data-testid="item-card"
      >
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    );
  }
}

export default ItemCard;
