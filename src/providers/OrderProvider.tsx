import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { Order } from "../types/order";

type OrderContextType ={
  order: Order | null;
  //この書き方を覚える。
  setOrder: Dispatch<SetStateAction<Order | null>>;
}
//asで強制的にエラーを排除する。
export const OrderContext = createContext<OrderContextType>({} as OrderContextType);

type Props = {
  children: ReactNode;
}

export const OrderProvider = (props: Props) => {
  const { children } = props;
  const [order, setOrder] = useState<Order | null>(null)
  return (
    <>
      <OrderContext.Provider value={{ order, setOrder }}>
        { children }
      </OrderContext.Provider>
    </>
  )
}
