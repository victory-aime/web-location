import { BoxProps, FlexProps } from "@chakra-ui/react";
import { hexToRGB } from "_theme/colors";

const layoutStyle: BoxProps = {
  bg: "black",
  transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
  ms: { base: 0, md: "100px", lg: "260px" },
  w: { base: "100vw", md: "calc(100vw - 100px)", lg: "calc(100vw - 260px)" },
  position: "relative",
  boxShadow: `0 0 35px ${hexToRGB("overlay", 0.06)}`,
  overflow: "hidden",
  height: "calc(100vh - 35px)",
};
const footerStyles: FlexProps = {
  bg: "black",
  position: "fixed",
  w: "100%",
  bottom: "0",
  alignItems: "center",
  justifyContent: "center",
};
export { layoutStyle, footerStyles };
