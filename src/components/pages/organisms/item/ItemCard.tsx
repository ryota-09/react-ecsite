import { FC } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

import { Item } from "../../../../types/item";

type Props = {
  item: Item;
  onClick: (itemid: number) => void;
};

export const ItemCard: FC<Props> = (props) => {
  const { item, onClick } = props;

  return (
    <>
      <Box
        w="280px"
        h="300px"
        bg="white"
        m={5}
        borderRadius="10px"
        shadow="md"
        p={4}
        _hover={{ cursor: "pointer", opacity: 0.8 }}
      >
        <Stack textAlign="center">
          <Image
            boxSize="160px"
            borderRadius="full"
            alt={item.name}
            m="auto"
            src={item.imagePath}
            onClick={() => onClick(item.id)}
          />
          <Text fontSize="lg" fontWeight="bold">
            {item.name}
          </Text>
          <Text fontSize="sm" color="gray.400">
            M: {item.priceM}円
          </Text>
          <Text fontSize="sm" color="gray.400">
            L: {item.priceL}円
          </Text>
        </Stack>
      </Box>
    </>
  );
};
