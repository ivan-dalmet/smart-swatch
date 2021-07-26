import React from "react";
import { Box } from "@chakra-ui/react";

import { SmartSwatch } from "./pages/SmartSwatch";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Box px="8" pt="6" pb="12" maxW="6xl" m="auto">
        <SmartSwatch />
      </Box>
    </ChakraProvider>
  );
}

export default App;
