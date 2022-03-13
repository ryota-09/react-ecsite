import { ItemList } from "../components/pages/ItemList";
import { Login } from "../components/pages/Login";
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
]
