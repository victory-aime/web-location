import { BoxProps, LinkProps, TextProps } from "@chakra-ui/react";
import { MotionStyle } from "framer-motion";
import { useCallback, useMemo } from "react";
import { hexToRGB } from "_theme/colors";
import { subItems } from "../types";
import useIsActive from "./useIsActive";
import { VariablesColors } from "_theme/variables";

interface UseSideBarStyleProps {
  sideToggled: boolean;
}
const useSideBarStyle = ({ sideToggled }: UseSideBarStyleProps) => {
  const { pathname, itHasActiveChildLink } = useIsActive();

  const isActiveLink = (link: string): boolean | undefined =>
    link.startsWith(pathname ?? "");

  const sideBarStyle: BoxProps = useMemo(
    () => ({
      w: { base: "100%", md: "80px", lg: "230px" },
      h: { base: "0", md: "85%", lg: "95%" },
      bg: "black",
      boxShadow: "0 0px 0px 3px rgba(53, 107, 74, 0.35)",
      position: "fixed",
      transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      overflow: "hidden",
      borderRadius: "20px",
      ms: { base: "0", md: "10px", sm: "0", lg: "15px" },
      my: { base: "0", md: "10px", sm: "0", lg: "15px" },
      zIndex: { base: "999", md: "10" },
    }),
    []
  );
  const toggledSideBarStyle = useMemo(
    () =>
      sideToggled
        ? sideBarStyle
        : {
            ...sideBarStyle,
            w: { base: "100%", md: "220px", lg: "70px" },
            h: { base: "80%", md: "85%", lg: "95%" },
          },
    [sideBarStyle, sideToggled]
  );

  const textStyle: TextProps = useMemo(
    () => ({
      color: "lightGray.500",
      fontSize: "15px",
      transition: "all ease-in-out 200ms",
    }),
    []
  );
  const setMenuTextStyle = useCallback(
    (links?: subItems) =>
      itHasActiveChildLink(links)
        ? {
            ...textStyle,
            fontWeight: "500",
            fontSize: "15px",
            color: "primary.500",
          }
        : textStyle,
    [pathname]
  );
  const setMenuItemTextStyle = useCallback(
    (link: string) =>
      isActiveLink(link)
        ? {
            ...textStyle,
            color: "primary.500",
            bgColor: hexToRGB("primary", 0.2),
            fontWeight: "500",
          }
        : {
            ...textStyle,
            color: "white",
          },
    [pathname]
  );
  // Utilisation de useCallback pour définir le style
  const setMenuItemPointStyle = useCallback(
    (link: string) =>
      isActiveLink(link) ? VariablesColors.primary : VariablesColors.grayScale,
    [pathname]
  );
  const toggledTextStyles = useMemo(
    () =>
      sideToggled
        ? {
            ...textStyle,
            w: { base: 0, md: 0, lg: "100%" },
            h: { base: 0, md: 0, lg: "auto" },
            opacity: { base: 0, md: 0, lg: 1 },
            overflow: { base: "hidden", md: "hidden", lg: "auto" },
          }
        : {
            ...textStyle,
            w: { base: "100%", md: "100%", lg: 0 },
            h: { base: "auto", md: "auto", lg: 0 },
            opacity: { base: 1, md: 1, lg: 0 },
            overflow: { base: "auto", md: "auto", lg: "hidden" },
          },
    [sideToggled, textStyle]
  );
  const activeItemStyle: BoxProps = {
    position: "relative",
    insetStart: "-19px",
    top: 0,
    height: "100%",
    width: "30px !important",
    overflow: "hidden",
  };
  const activeIconStyle: MotionStyle = {
    position: "initial",
    width: "30px",
    pointerEvents: "none",
  };
  const linkStyle: LinkProps = {
    position: "relative",
    fontSize: "14px",
    color: "gray.500",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "40px",
    mt: 5,
    gap: "10px",
    p: "14px",
    outline: "none !important",
    _focus: {
      boxShadow: "none",
    },
    _hover: {
      textDecoration: "none",
    },
  };
  const activeLinkStyle: LinkProps = {
    position: "relative",
    fontSize: "14px",
    color: "gray.500",
    display: "flex",
    alignItems: "center",
    height: "48px",
    mt: 0,
    p: "14px",
    outline: "none !important",
    _focus: {
      boxShadow: "none",
    },
    _hover: {
      textDecoration: "none",
    },
  };
  return {
    linkStyle,
    toggledTextStyles,
    textStyle,
    sideBarStyle,
    toggledSideBarStyle,
    activeItemStyle,
    activeIconStyle,
    setMenuTextStyle,
    setMenuItemTextStyle,
    activeLinkStyle,
    setMenuItemPointStyle,
  };
};
export default useSideBarStyle;
