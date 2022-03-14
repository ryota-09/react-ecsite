import { Topping } from "./topping";

export type orderTopping = {
  id: number;
  toppingId: number;
  orderItemId: number;
  topping: Topping;
}
