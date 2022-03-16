import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";
import { OrderProvider } from "./providers/OrderProvider";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <OrderProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </OrderProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;
