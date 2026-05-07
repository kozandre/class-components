export interface Item {
  id: string;
  name: string;
  description: string;
}

export interface ItemCardProps {
  item: Item;
}

export interface ItemListProps {
  items: Item[];
}
