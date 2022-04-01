import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Wrap,
  Image,
  Box,
  Button,
  Text,
  Flex,
  Stack,
  FormControl,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useContext } from "react";
import { usePostOrder } from "../../hooks/usePostOrder";
import { OrderContext } from "../../providers/OrderProvider";
import { PrimaryButton } from "../atoms/button/PrimaryButton";

export const OrderConfirm = () => {
  const { globalState, setGlobalState } = useContext(OrderContext);
  const { postOrder } = usePostOrder();
  return (
    <>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        <h1>注文ページ</h1>
        <Box w="100%" bg="white" m={5} borderRadius="10px" shadow="md" p={4}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>商品名</Th>
                <Th>サイズ、価格(税抜)、数量</Th>
                <Th>トッピング、価格(税抜)</Th>
                <Th>小計</Th>
              </Tr>
            </Thead>
            {globalState.orderItemList.map((orderItem, index) => (
              <Tbody key={orderItem.id}>
                <Tr>
                  <Td>
                    <Image
                      src={orderItem.item.imagePath}
                      objectFit="cover"
                      boxSize="100px"
                    />
                    <p>{orderItem.item.name}</p>
                  </Td>
                  <Td>
                    {orderItem.size} {orderItem.item.priceM}円{" "}
                    {orderItem.quantity}個
                  </Td>
                  <Td>
                    {orderItem.orderToppingList.map((orderTopping, i) => (
                      <Box key={orderTopping.id}>
                        <p>
                          {orderTopping.topping?.name}{" "}
                          {orderTopping.topping?.priceM}円
                        </p>
                      </Box>
                    ))}
                  </Td>
                  <Td>小計の表示( )円</Td>
                </Tr>
              </Tbody>
            ))}
          </Table>
        </Box>
        <Flex align="center" justify="center">
        <Box
          h="auto"
          bg="white"
          borderRadius="10px"
          shadow="md"
          p={4}
        >
          <Stack textAlign="center" spacing={4}>
            <Text fontSize="lg" fontWeight="bold">
              送り先住所
            </Text>
            <FormControl>
              <InputGroup justifyContent="center">
                <Input
                  width="auto"
                  // onChange={onChanegeLastName}
                  placeholder="姓"
                  mx={3}
                />
                <Input
                  width="auto"
                  // onChange={onChanegeLastName}
                  placeholder="名"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  // onChange={onChanegeLastName}
                  placeholder="メールアドレス"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  // onChange={onChanegeLastName}
                  placeholder="郵便番号"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input placeholder="住所" mx={3} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  // onChange={onChanegeLastName}
                  placeholder="電話番号"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  // onChange={onChanegeLastName}
                  placeholder="パスワード"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup>
                <Input
                  // onChange={onChanegeLastName}
                  placeholder="確認用パスワード"
                  mx={3}
                />
              </InputGroup>
            </FormControl>
            <Button colorScheme="green" onClick={postOrder}>注文する</Button>
          </Stack>
        </Box>
      </Flex>
      </Wrap>
    </>
  );
};
