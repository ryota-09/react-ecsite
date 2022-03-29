import axios from "axios";
import { format } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import { OrderContext } from "../providers/OrderProvider";
import { OrderItem } from "../types/orderItem";

type orderForm = {
  itemId: number;
  quantity: number;
  size: string;
};

export const usePostOrder = () => {
  const { globalState } = useContext(OrderContext);
  const [orderFormList, setOrderFormList] = useState<Array<orderForm>>();
  const makeOrderFormList = () => {
    const newArray = [];
    for (const orderItem of globalState.order
      ?.orderItemList as Array<OrderItem>) {
      newArray.push({
        itemId: orderItem.itemId,
        quantity: orderItem.quantity,
        size: orderItem.size,
      });
    }
    setOrderFormList([...newArray]);
  };
  useEffect(() => {
    makeOrderFormList();
  }, []);
  const postOrder = useCallback(async () => {
    try {
      const response = await axios.post(
        "http://153.127.48.168:8080/ecsite-api/order",
        {
          userId: 12,
          status: globalState.order?.status,
          totalPrice: 20000,
          destinationName: globalState.order?.destinationName,
          destinationEmail: globalState.order?.destinationEmail,
          destinationZipcode: globalState.order?.destinationZipcode,
          destinationAddress: globalState.order?.destinationAddress,
          destinationTel: globalState.order?.destinationTel,
          deliveryTime: format(new Date(), "yyyy/MM/dd hh:mm:ss"),
          paymentMethod: globalState.order?.paymentMethod,
          orderItemFormList: orderFormList,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return { postOrder };
};
