import { CartList } from "../components/pages/Cartlist";
import { ItemDetail } from "../components/pages/ItemDetail";
import { ItemList } from "../components/pages/ItemList";
import { Login } from "../components/pages/Login";
import { OrderConfirm } from "../components/pages/OrderConfirm";
import { RegisterUser } from "../components/pages/RegisterUser";

export const HomeRoutes = [
  {
    path: "/",
    name: "ItemList",
    exact: true,
    children: <ItemList />
  },
  {
    path: "/registerUser",
    name: "RegisterUser",
    exact: false,
    children: <RegisterUser />
  },
  {
    path: "/login",
    name: "Login",
    exact: false,
    children: <Login />
  },
  {
    path: "/itemDetail/:id",
    name: "ItemDetail",
    exact: false,
    children: <ItemDetail />
  },
  {
    path: "/cartList",
    name: "CartList",
    exact: false,
    children: <CartList />
  },
  {
    path: "/orderConfirm",
    name: "OrderConfirm",
    exact: false,
    children: <OrderConfirm />
  },
]
