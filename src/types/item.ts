import { Topping } from "./topping";

export type Item = {
  id: number;
  type: string;
  name: string;
  description: string;
  priceM: number;
  priceL: number;
  imagePath: string;
  deleted: boolean;
  toppingList: Topping | null;
};
