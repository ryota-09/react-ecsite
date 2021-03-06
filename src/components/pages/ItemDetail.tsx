import {
  Box,
  Flex,
  Stack,
  Image,
  Text,
  Radio,
  RadioGroup,
  CheckboxGroup,
  Checkbox,
  Select,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

import { useAllToppingList } from "../../hooks/useAllToppingList";
import { useOrder } from "../../hooks/useOrder";
import { usePrice } from "../../hooks/usePrice";
import { useSelectItem } from "../../hooks/useSelectItem";
import { useSelectTopping } from "../../hooks/useSelectTopping";
import { Item } from "../../types/item";
import { OrderTopping } from "../../types/orderTopping";
import { Topping } from "../../types/topping";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { SubTotalArea } from "../atoms/SubTotalArea";

export const ItemDetail: FC = () => {
  const history = useHistory();
  const { state } = useLocation<number>();
  const { selectedItem, onSelectItem } = useSelectItem();
  const { toppingList, getAllToppingList } = useAllToppingList();
  const { selectedTopping, onSelectTopping } = useSelectTopping();
  const { globalState, setGlobalState } = useOrder();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedToppingList, setSelectedToppingList] = useState<
    Array<Topping | null>
  >([]);
  const [selectedToppingIdList, setSelectedToppingIdList] = useState<
    Array<number>
  >([]);
  const [selectedAmount, setSelectedAmount] = useState<number>();
  const [ orderToppingList, setOrderToppingList ] = useState<Array<OrderTopping>>([])
  const [subTotalPrice, setSubTotalPrice] = useState<number>(0);

  useEffect(() => {
    onSelectItem({ itemId: state });
    getAllToppingList();
  }, []);

  const onChangeSize = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };
  // v-modelのチェックボックスの再現
  //最初に選んだものがボックスに入らない。。。
  const onChangeTopping = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    let targetId: number = Number(event.target.value);

    const isInclude = (targetNum: number): boolean => {
      return selectedToppingIdList.includes(targetId);
    };
    onSelectTopping({ toppingId: targetId });

    if (isInclude(targetId) && selectedToppingIdList.length !== 0) {
      setSelectedToppingIdList(
        selectedToppingIdList.filter(
          (toppingId) => toppingId !== Number(event.target.value)
        )
      );
      setSelectedToppingList([...selectedToppingList, selectedTopping]);
    } else if (selectedToppingIdList.length === 0) {
      setSelectedToppingIdList([...selectedToppingIdList, targetId]);
    } else {
      setSelectedToppingIdList([...selectedToppingIdList, targetId]);
    }
  };

  //一度目がうまくいかない。。。
  const onChangeAmount = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedAmount(Number(event.target.value));
  };

  //トッピングIDリストからトッピングリストを作る
  const changeSelectedToppingList = (
    toppingIdList: Array<number>
  ) => {
    const currentOrderToppingList: Array<OrderTopping> = [];
    let i = 0;
    for (let toppingId of toppingIdList) {
      const topping = selectedItem?.toppingList?.find((topping) => {
        return topping.id === toppingId;
      });
      if (topping !== undefined) {
        const orderTopping: OrderTopping = {
          id: i++,
          toppingId: toppingId,
          orderItemId: 0,
          topping: topping ?? null,
        };
        currentOrderToppingList.push(orderTopping);
      }
    }
    setOrderToppingList([...currentOrderToppingList]);
  };
  useEffect(() => {
    changeSelectedToppingList(selectedToppingIdList)
  }, [selectedToppingIdList])

  const calcSubTotalPrice = (): void => {
    setSubTotalPrice(0);
    let subTotal = 0;
    console.log(selectedToppingList);
    if (selectedSize === "M") {
      let sizePrice = 0;
      sizePrice = Number(selectedItem?.priceM);
      if (selectedToppingList.length === 0) {
        subTotal = sizePrice * Number(selectedAmount ?? 1);
      } else if (selectedToppingList.length >= 1) {
        let toppingAmount = 0;
        toppingAmount = selectedToppingList.length * 200;
        subTotal = (sizePrice + toppingAmount) * Number(selectedAmount ?? 1);
      }
    } else if (selectedSize === "L") {
      let sizePrice = 0;
      sizePrice = Number(selectedItem?.priceL);
      if (selectedToppingList.length === 0) {
        subTotal = sizePrice * Number(selectedAmount);
      } else if (selectedToppingList.length >= 1) {
        let toppingAmount = 0;
        toppingAmount = selectedToppingList.length * 300;
        subTotal = (sizePrice + toppingAmount) * Number(selectedAmount ?? 1);
      }
    }
    setSubTotalPrice(subTotal);
  };
  useEffect(() => {
    calcSubTotalPrice();
  },[selectedSize, selectedToppingList, selectedAmount, selectedToppingIdList])

  //StoreのStateに保存する。
  const addToCart = () => {
    const orderItemList = globalState.orderItemList;
    let newNumber = 0;
    console.log(orderItemList)
    /////////idの採番がうまくいかない///////////////
    if (orderItemList.length !== 0) {
      const latestOrderItem = orderItemList[orderItemList.length - 1];
      newNumber = latestOrderItem.id + 1;
    }
    console.log(newNumber);
    setGlobalState({
      type: "ADD_ITEM",
      payload: {
        orderItem: {
          id: newNumber,
          itemId: selectedItem?.id ?? 0,
          quantity: selectedAmount ?? 1,
          size: selectedSize,
          item: {
            id: selectedItem?.id ?? 0,
            type: selectedItem?.type ?? "",
            name: selectedItem?.name ?? "",
            description: selectedItem?.description ?? "",
            priceM: selectedItem?.priceM ?? 0,
            priceL: selectedItem?.priceL ?? 0,
            imagePath: selectedItem?.imagePath ?? "",
            deleted: selectedItem?.deleted ?? false,
            toppingList: selectedItem?.toppingList ?? null,
          },
          orderToppingList: orderToppingList,
        },
      },
    });
    history.push("/cartList");
  };
  return (
    <>
      <Flex
        align="center"
        justify="center"
        height="auto"
        mx={{ base: 4, md: 8 }}
      >
        <Box w="100%" bg="white" m={5} borderRadius="10px" shadow="md" p={4}>
          <Stack textAlign="center">
          <Text>
              合計{subTotalPrice}
            </Text>
            <Image
              boxSize="160px"
              borderRadius="10px"
              alt={selectedItem?.name}
              m="auto"
              src={selectedItem?.imagePath}
            />
            <Text fontSize="lg" fontWeight="bold">
              {selectedItem?.name}
            </Text>
            <Text fontSize="sm" color="gray.400">
              {selectedItem?.description}
            </Text>
            <RadioGroup>
              <Stack direction="row">
                <Radio value="M" onChange={onChangeSize}>
                  M: {selectedItem?.priceM}円
                </Radio>
                <Radio value="L" onChange={onChangeSize}>
                  L: {selectedItem?.priceL}円
                </Radio>
              </Stack>
            </RadioGroup>
            {selectedItem?.toppingList?.map((topping) => (
              <CheckboxGroup colorScheme="blue" key={topping.id}>
                <Stack spacing={[1, 5]} direction={["column"]}>
                  <Checkbox value={`${topping.id}`} onChange={onChangeTopping}>
                    {topping.name}
                  </Checkbox>
                </Stack>
              </CheckboxGroup>
            ))}
            <Select placeholder="選択してください" onChange={onChangeAmount}>
              <option value="1" defaultValue="1">
                1
              </option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </Select>
            <Text>
              合計{subTotalPrice}
            </Text>
            <PrimaryButton onClick={addToCart}>カートに追加</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
