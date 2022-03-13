import axios from "axios";
import { useCallback, useState } from "react";

import { Topping } from "../types/topping";

export const useAllToppingList = () => {
  const [toppingList, setToppingList] = useState<Array<Topping>>([]);

  const getAllToppingList = useCallback(async (): Promise<void> => {
    try {
      const response = await axios.get<{
        totalToppingCount: number;
        toppings: Array<Topping>;
      }>("http://153.127.48.168:8080/ecsite-api/item/toppings/coffee");
      setToppingList(response.data.toppings);
    } catch (error) {
      alert(error);
    }
  }, []);
  return { toppingList, getAllToppingList };
};
