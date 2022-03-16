import { Item } from "./item";
import { OrderTopping } from "./orderTopping";

export type OrderItem = {
  id: number;
  itemId: number;
  quantity: number;
  size: string;
  item: Item;
  orderToppingList: Array<OrderTopping>;
}
