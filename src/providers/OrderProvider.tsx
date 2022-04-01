import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Order } from "../types/order";
import { OrderItem } from "../types/orderItem";
import { User } from "../types/user";

export type OrderContextType = {
  //order: Order | null;
  //この書き方を覚える。
  //setOrder: Dispatch<SetStateAction<Order | null>>;
  globalState: State;
  setGlobalState: Dispatch<Action>;
};
//asで強制的にエラーを排除する。
export const OrderContext = createContext({} as OrderContextType);

type State = {
  orderId: number;
  userId: number;
  status: number;
  totalPrice: number;
  orderDate: Date;
  destinationName: string;
  destinationEmail: string;
  destinationZipcode: string;
  destinationAddress: string;
  destinationTel: string;
  deliveryTime: Date;
  paymentMethod: number;
  user: User | null;
  orderItemList: Array<OrderItem>;
};

type Action = {
  type: "ADD_ITEM";
  payload: { orderItem: OrderItem };
};

const initialState: State = {
  orderId: 0,
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
  orderItemList: new Array<OrderItem>(),
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        orderItemList: [...state.orderItemList, action.payload.orderItem],
      };
    default:
      return state;
  }
};

type Props = {
  children: ReactNode;
};

export const OrderProvider = (props: Props) => {
  const { children } = props;
  const [globalState, setGlobalState] = useReducer(reducer, initialState);
  return (
    <>
      <OrderContext.Provider value={{ globalState, setGlobalState }}>
        {children}
      </OrderContext.Provider>
    </>
  );
};
