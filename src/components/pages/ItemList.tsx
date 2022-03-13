/* eslint-disable react-hooks/exhaustive-deps */
import { Wrap, WrapItem } from "@chakra-ui/react";
import { FC, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { useAllItemList } from "../../hooks/useAllItemList";
import { useSelectItem } from "../../hooks/useSelectItem";
import { ItemCard } from "./organisms/item/ItemCard";

export const ItemList: FC = () => {
  const history = useHistory();
  const { itemList, getAllItemList } = useAllItemList();

  useEffect(() => {
    getAllItemList();
  }, []);

  const onClickItem = useCallback(
    (itemId: number) => {
      history.push({ pathname: `/itemDetail/${itemId}`, state: itemId});
    },
    []
  );

  return (
    <>
      <h2>商品一覧のページです。</h2>
      <Wrap p={{ base: 4, md: 10 }} justify="center">
        {itemList.map((item) => (
          <WrapItem key={item.id}>
            <ItemCard item={item} onClick={onClickItem} />
          </WrapItem>
        ))}
      </Wrap>
    </>
  );
};
