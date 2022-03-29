import {
  createContext,
  Dispatch,
  ReactNode,
  useReducer,
} from "react";
import { Order } from "../types/order";
import { OrderItem } from "../types/orderItem";

export type OrderContextType = {
  //order: Order | null;
  //この書き方を覚える。
  //setOrder: Dispatch<SetStateAction<Order | null>>;
  globalState: State,
  setGlobalState: Dispatch<Action>
};
//asで強制的にエラーを排除する。
export const OrderContext = createContext(
  {} as OrderContextType
);

type State = {
  order: Order | null;
};

type Action = {
  type: "ADD_ITEM";
  payload: { orderItem: OrderItem };
};

const initialState: State = {
  order: {
    id: 0,
    userId: 0,
    status: 0,
    totalPrice: 0,
    orderDate: new Date(),
    destinationName: "",
    destinationEmail: "",
    destinationZipcode: "",
    destinationAddress: "",
    destinationTel: "",
    deliveryTime: new Date(),
    paymentMethod: 0,
    user: null,
    orderItemList: new Array<OrderItem>()
  }
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM":
      state.order?.orderItemList.push(action.payload.orderItem);
      return state
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const OrderProvider = (props: Props) => {
  const { children } = props;
  const [ globalState, setGlobalState ] = useReducer(reducer, initialState);
  return (
    <>
      <OrderContext.Provider value={{ globalState, setGlobalState }}>
        {children}
      </OrderContext.Provider>
    </>
  );
};
