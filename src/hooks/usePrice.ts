/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useState } from "react";
import { OrderContext } from "../providers/OrderProvider";
import { OrderItem } from "../types/orderItem";
import { OrderTopping } from "../types/orderTopping";

export const usePrice = () => {
  const { globalState } = useContext(OrderContext);
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItem>();
  const [ subTotalPrice, setSubTotalPrice ] = useState(0);

  const calcSubTotalPrice = useCallback((orderItemId: number, orderToppingList: Array<OrderTopping>) => {
    setSubTotalPrice(0);
    let newPrice = 0;
    for(let orderItem of globalState.orderItemList as Array<OrderItem>){
      if( orderItem.id === orderItemId ){
        setCurrentOrderItem(orderItem);
      }
    }
    const TOPPING_PRICE_M = 200;
    const TOPPING_PRICE_L = 300;

    if (currentOrderItem?.size === "M") {
      //トッピングの合計金額
      const toppingSubTotalM = currentOrderItem?.orderToppingList.length * TOPPING_PRICE_M;
      newPrice = (currentOrderItem?.item.priceM + toppingSubTotalM) * currentOrderItem?.quantity;
      //Mサイズの場合の小計
      setSubTotalPrice(newPrice);
    } else if (currentOrderItem?.size === "L") {
      //トッピングの合計金額
      const toppingSubTotalL = currentOrderItem?.orderToppingList.length * TOPPING_PRICE_L;
      newPrice = (currentOrderItem?.item.priceL + toppingSubTotalL) * ( currentOrderItem?.quantity);
      //Lサイズの場合の小計
      setSubTotalPrice(newPrice);
    }
  },[globalState, currentOrderItem]);

  return { subTotalPrice, calcSubTotalPrice }
}
