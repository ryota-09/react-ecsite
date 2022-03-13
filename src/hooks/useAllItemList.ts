import axios from "axios";
import { useCallback } from "react";

export const useAllItemList = () => {
  const getAllItemList = useCallback( async (): Promise<void> => {
  try {
      const response = await axios.get("http://153.127.48.168:8080/ecsite-api/item/items/coffee");
    }
  catch (error){

  }
},[])
  return { getAllItemList }
}
