import type { Item } from '../features/items/item.types';

export interface HomePageState {
  items: Item[];
  loading: boolean;
  error: string | null;
}
