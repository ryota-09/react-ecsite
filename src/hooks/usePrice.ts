/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from "react"
import { OrderContext } from "../providers/OrderProvider";
import { OrderItem } from "../types/orderItem";

export const usePrice = () => {
  const { globalState } = useContext(OrderContext);
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItem>();
  const [ subTotalPrice, setSubTotalPrice ] = useState(0);

  const calcSubTotalPrice = useCallback((orderItemId: number) => {
    for(let orderItem of globalState.order?.orderItemList as Array<OrderItem>){
      if( orderItem.id === orderItemId ){
        setCurrentOrderItem(orderItem);
      }
    }
    const TOPPING_PRICE_M = 200;
    const TOPPING_PRICE_L = 300;

    if (currentOrderItem?.size === "M") {
      //トッピングの合計金額
      const toppingSubTotalM = currentOrderItem?.orderToppingList.length * TOPPING_PRICE_M;
      //Mサイズの場合の小計
      setSubTotalPrice((currentOrderItem?.item.priceM + toppingSubTotalM) * currentOrderItem?.quantity);
    } else if (currentOrderItem?.size === "L") {
      //トッピングの合計金額
      const toppingSubTotalL = currentOrderItem?.orderToppingList.length * TOPPING_PRICE_L;
      //Lサイズの場合の小計
      setSubTotalPrice((currentOrderItem?.item.priceL + toppingSubTotalL) * currentOrderItem?.quantity);
    }
  },[globalState]);

  return { subTotalPrice, calcSubTotalPrice }
}
