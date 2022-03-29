import { useContext } from "react"
import { OrderContextType, OrderContext } from "../providers/OrderProvider"

export const useOrder = (): OrderContextType => {
  return useContext(OrderContext);
}
