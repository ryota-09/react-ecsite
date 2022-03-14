import { Item } from "./item";
import { orderTopping } from "./orderTopping";

export type orderItem = {
  id: number;
  itemId: number;
  quantity: number;
  size: string;
  item: Item;
  orderToppingList: Array<orderTopping>;
}
