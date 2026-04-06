import { Item } from '../entities/item.entity';
export interface CartItem {
  item: Item;
  quantity: number;
}
export interface MySessionData {
  userId?: number;
  username?: string;
  role?: string;
}
