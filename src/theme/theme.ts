import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { keyframes, animations } from "./animations";
import { breakpoints } from "./breakpoints";
import { colors } from "./colors";

const config = defineConfig({
  theme: {
    keyframes,
    breakpoints,
    textStyles: {},
    tokens: {
      animations,
      colors,
    },
  },
});

export const customTheme = createSystem(defaultConfig, config);
