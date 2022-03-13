import { FC, memo } from "react";
import { Route, Switch } from "react-router-dom";

import { HomeRoutes } from "./HomeRoutes";

export const Router: FC = memo(() => {
  return (
    <>
      <Switch>
        <Route
          path="/"
          render={({ match: url }) => (
            <Switch>
              {HomeRoutes.map((route) => (
                <Route key={route.path} exact={route.exact} path={route.path}>
                  {route.children}
                </Route>
              ))}
            </Switch>
          )}
        ></Route>
      </Switch>
    </>
  );
});
