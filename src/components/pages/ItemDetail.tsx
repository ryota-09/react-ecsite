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
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { useAllToppingList } from "../../hooks/useAllToppingList";
import { useSelectItem } from "../../hooks/useSelectItem";
import { useSelectTopping } from "../../hooks/useSelectTopping";
import { Topping } from "../../types/topping";
import { PrimaryButton } from "../atoms/button/PrimaryButton"

export const ItemDetail = () => {
  const { state } = useLocation<number>();
  const { selectedItem, onSelectItem } = useSelectItem();
  const { toppingList, getAllToppingList } = useAllToppingList();
  const { selectedTopping, onSelectTopping } = useSelectTopping();

  const [ selectedSize, setSelectedSize ] = useState("");
  const [ selectedToppingList, setSelectedToppingList ] = useState<Array<Topping>>([]);
  const [ selectedToppingIdList, setSelectedToppingIdList ] = useState<Array<number>>([])
  const [ selectedAmount, setSelectedAmount ] = useState<number>();


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
    }
    onSelectTopping({toppingId: targetId});

    if( isInclude(targetId) && selectedToppingIdList.length !== 0){
      setSelectedToppingIdList(selectedToppingIdList.filter( toppingId => toppingId  !== Number(event.target.value)))
      // setSelectedToppingList([...selectedToppingList, selectedTopping]);
    } else if( selectedToppingIdList.length === 0 ){
      console.log(Number(event.target.value))
      setSelectedToppingIdList([...selectedToppingIdList, targetId]);
      console.log("0の方")
    } else {
      setSelectedToppingIdList([...selectedToppingIdList, targetId]);
      console.log("elseの方",selectedToppingIdList);
    }
    console.log(selectedToppingIdList);
  };

  //一度目がうまくいかない。。。
  const onChangeAmount = (event: ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setSelectedAmount(Number(event.target.value));
    console.log(selectedAmount);
  };

  const addToCart = () => {
    alert("カート")
  }

  return (
    <>
      <Flex align="center" justify="center" height="auto" mx={{base: 4, md: 8}}>
        <Box w="100%" bg="white" m={5} borderRadius="10px" shadow="md" p={4}>
          <Stack textAlign="center">
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
                <Radio value="L" onChange={onChangeSize}>L: {selectedItem?.priceL}円</Radio>
              </Stack>
            </RadioGroup>
            {selectedItem?.toppingList?.map((topping) => (
              <CheckboxGroup colorScheme="blue" key={topping.id}>
                <Stack spacing={[1, 5]} direction={["column"]}>
                  <Checkbox value={`${topping.id}`} onChange={onChangeTopping}>{topping.name}</Checkbox>
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
            <PrimaryButton onClick={addToCart}>カートに追加</PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
