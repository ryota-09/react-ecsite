import React from "react";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme/theme";

function App() {
  return (
    <div className="App">
      <ChakraProvider theme={theme}>
        <h1>タイトル</h1>
      </ChakraProvider>
    </div>
  );
}

export default App;
