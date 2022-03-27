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
  state: State,
  dispatch: Dispatch<Action>
};
//asで強制的にエラーを排除する。
export const OrderContext = createContext(
  {} as OrderContextType
);

type State = {
  order: Order | null;
};

type Action = {
  type: string;
  payload: { orderItem: OrderItem };
};

const initialState: State = {
  order: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_ITEM":
      state.order?.orderItemList.push(action.payload.orderItem);
      return {
        order: state.order,
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
  const [ state, dispatch ] = useReducer(reducer, initialState);
  return (
    <>
      <OrderContext.Provider value={{ state, dispatch }}>
        {children}
      </OrderContext.Provider>
    </>
  );
};
