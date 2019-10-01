import React from 'react';
import { ThemeProvider, ColorModeProvider, CSSReset, Box } from "@chakra-ui/core";

import { SmartSwatch } from './pages/SmartSwatch';

function App() {
  return (
    <ThemeProvider>
      <ColorModeProvider>
        <CSSReset />
        <Box px="8" pt="6" pb="12" maxW="6xl" m="auto">
          <SmartSwatch />
        </Box>
      </ColorModeProvider>
    </ThemeProvider>
  );
}

export default App;
