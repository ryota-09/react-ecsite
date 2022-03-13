/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";

import { useAllItemList } from "../../hooks/useAllItemList";

export const ItemList: FC = () => {
  const { itemList, getAllItemList } = useAllItemList();

  useEffect(() => {
    getAllItemList();
  },[])

  return (
    <>
      <h2>商品一覧のページです。</h2>
      {itemList.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </>
  );
};
