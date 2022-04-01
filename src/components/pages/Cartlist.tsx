import { Box, Table, Tbody, Td, Th, Thead, Tr, Wrap,Image, Button, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { usePrice } from "../../hooks/usePrice";
import { OrderContext } from "../../providers/OrderProvider";
import { OrderItem } from "../../types/orderItem";
import { SubTotalArea } from "../atoms/SubTotalArea";

export const CartList = () => {
  const { globalState } = useContext(OrderContext);
  const { subTotalPrice, calcSubTotalPrice } = usePrice();
  
  const [ totalPrice, setTotalPrice ] = useState(0);
  const history = useHistory();

  
  const calcTotalPrice = () => {
    let total = 0;
    for(let orderItem of globalState.orderItemList as Array<OrderItem>){
      // calcSubTotalPrice(orderItem.id);
      total = total + subTotalPrice;
    } 
    setTotalPrice(total);
  }
  const toOrderPage = () => {
    history.push("/orderConfirm")
  }
  useEffect(() =>{
    calcTotalPrice();
  },[subTotalPrice])
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
          {globalState.orderItemList.map((orderItem, index) => (
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
                <Td>
                <SubTotalArea orderItemId={orderItem.id} orderToppingList={orderItem.orderToppingList}/>
                </Td>
                <Td>
                  <Button colorScheme="green">削除</Button>
                </Td>
              </Tr>
            </Tbody>
          ))}
        </Table>
        <Box>
          <Text>合計金額: {totalPrice}円</Text>
          <Button colorScheme="green"  onClick={toOrderPage}>注文に進む</Button>
        </Box>
      </Wrap>
    </>
  );
};
