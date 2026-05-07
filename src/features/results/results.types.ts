import type { Item } from '../items/item.types';

export interface ResultsSectionProps {
  items: Item[];
  loading?: boolean;
  error?: string | null;
}
