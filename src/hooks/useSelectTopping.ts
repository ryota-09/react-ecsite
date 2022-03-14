/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react"

import { Topping } from "../types/topping";
import { useAllToppingList } from "./useAllToppingList";

type Props = {
  toppingId: number;
}

export const useSelectTopping = () => {
  const [ selectedTopping, setSelectTopping ] = useState<Topping | null>(null);
  const { toppingList, getAllToppingList } = useAllToppingList();

  useEffect(() => {
    getAllToppingList();
  }, [])

  const onSelectTopping = useCallback( (props: Props) => {
    const { toppingId } = props;
    const targetTopping = toppingList.find((topping) => topping.id === toppingId)

    setSelectTopping(targetTopping ?? null);
    console.log(selectedTopping);
  }, [])
  return { selectedTopping, onSelectTopping }
}
