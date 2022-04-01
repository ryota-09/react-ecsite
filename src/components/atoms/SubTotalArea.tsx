import { FC, useEffect, useMemo } from "react";
import { usePrice } from "../../hooks/usePrice";
import { OrderTopping } from "../../types/orderTopping";

type Props = {
  orderItemId: number;
  orderToppingList: Array<OrderTopping>;
};

export const SubTotalArea: FC<Props> = (props) => {
  const { orderItemId, orderToppingList } = props;
  const { subTotalPrice, calcSubTotalPrice } = usePrice();
  // useEffect(() => {
  //   calcSubTotalPrice(orderItemId, orderToppingList);
  // },[orderItemId, orderToppingList]);

  useEffect(() => {
    calcSubTotalPrice(orderItemId, orderToppingList)
  })
  return (
    <>
      <span>{subTotalPrice}円</span>
    </>
  )
}
