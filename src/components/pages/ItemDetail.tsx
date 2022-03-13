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
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useSelectItem } from "../../hooks/useSelectItem";

export const ItemDetail = () => {
  const { state } = useLocation<number>();
  const { selectedItem, onSelectItem } = useSelectItem();

  useEffect(() => {
    onSelectItem({ itemId: state });
  }, []);

  return (
    <>
      <Flex align="center" justify="center" height="110vh">
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
                <Radio value="M">M: {selectedItem?.priceM}円</Radio>
                <Radio value="L">L: {selectedItem?.priceL}円</Radio>
              </Stack>
            </RadioGroup>
            {selectedItem?.toppingList?.map((topping) => (
              <CheckboxGroup colorScheme="blue" key={topping.id}>
                <Stack spacing={[1, 5]} direction={["column"]}>
                  <Checkbox value="topping.id">{topping.name}</Checkbox>
                </Stack>
              </CheckboxGroup>
            ))}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};
