import axios from "axios";
import { useCallback, useState } from "react"
import { Item } from "../types/item";

type Props = {
  itemId: number;
}

export const useSelectItem = () => {
  const [ selectedItem, setSelectedItem ] = useState<Item>()
  const onSelectItem = useCallback( async (props: Props): Promise<void> => {
    const { itemId } = props;
    try {
      const response = await axios.get<{item: Item}>(`http://153.127.48.168:8080/ecsite-api/item/${itemId}`);
      setSelectedItem(response.data.item);
    } catch(error){
      alert("Detailのエラーです。")
    }
  }, [])
  return { selectedItem, onSelectItem }
}
