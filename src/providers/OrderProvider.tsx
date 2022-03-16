import { createContext, ReactNode } from "react"

export const OrderContext = createContext({});

type Props = {
  children: ReactNode;
}

export const OrderProvider = (props: Props) => {
  const { children } = props;
  return (
    <>
      <OrderContext.Provider value={{}}>
        { children }
      </OrderContext.Provider>
    </>
  )
}
