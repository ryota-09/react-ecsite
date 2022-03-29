import { Box, Table, Tbody, Td, Th, Thead, Tr, Wrap,Image } from "@chakra-ui/react";
import { useContext, useState } from "react";
import { OrderContext, OrderContextType } from "../../providers/OrderProvider";
import { OrderItem } from "../../types/orderItem";

export const CartList = () => {
  const { globalState } = useContext(OrderContext);
  const [currentOrderItem, setCurrentOrderItem] = useState<OrderItem>();

  const calcSubTotal = (orderItemId: number): number => {
    let subTotalPrice = 0;
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
      subTotalPrice = (currentOrderItem?.item.priceM + toppingSubTotalM) * currentOrderItem?.quantity;
    } else if (currentOrderItem?.size === "L") {
      //トッピングの合計金額
      const toppingSubTotalL = currentOrderItem?.orderToppingList.length * TOPPING_PRICE_L;
      //Lサイズの場合の小計
      subTotalPrice = (currentOrderItem?.item.priceL + toppingSubTotalL) * currentOrderItem?.quantity;
    }
    return subTotalPrice;
  }
  return (
    <>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        <h1>ショッピングカート</h1>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th>商品名</Th>
              <Th>サイズ、価格(税抜)、数量</Th>
              <Th>トッピング、価格(税抜)</Th>
              <Th>小計</Th>
              <Th>ボタンの部分</Th>
            </Tr>
          </Thead>
          {globalState.order?.orderItemList.map((orderItem, index) => (
            <Tbody key={orderItem.id}>
              <Tr>
                <Td>
                  <Image src={orderItem.item.imagePath} objectFit="cover" boxSize="100px"/>
                  <p>{orderItem.item.name}</p>
                </Td>
                <Td>{orderItem.size} {orderItem.item.priceM}円 {orderItem.quantity}個</Td>
                <Td>
                {orderItem.orderToppingList.map((orderTopping, i) => (
                  <Box  key={orderTopping.id}>
                    <p>{orderTopping.topping?.name} {orderTopping.topping?.priceM}円</p>
                  </Box>
                ))}
                </Td>
                <Td>{() => calcSubTotal(orderItem.id)}円</Td>
                <Td>削除ボタン</Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
      </Wrap>
    </>
  );
};
