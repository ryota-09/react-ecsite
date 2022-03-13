import axios from "axios";
import { useCallback, useState } from "react";

import { Item } from "../types/item";

export const useAllItemList = () => {
  const [ itemList, setItemList ] = useState<Array<Item>>([]);

  const getAllItemList = useCallback( async (): Promise<void> => {
  try {
      const response = await axios.get<{items: Array<Item>}>("http://153.127.48.168:8080/ecsite-api/item/items/coffee");
      setItemList(response.data.items);
    }
  catch (error){
    alert(error);
  }
},[])
  return { itemList, getAllItemList }
}
