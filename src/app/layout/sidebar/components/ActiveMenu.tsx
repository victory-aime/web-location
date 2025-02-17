import { Box, Flex, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import useSideBarStyle from "../hooks/useSideBarStyle";
import { ActiveMenuProps } from "../types";
import { useRouter } from "next/navigation";
import { Dot } from "_assets/svg";
import { VariablesColors } from "_theme/variables";
import { hexToRGB } from "_theme/colors";

const ActiveMenu: FC<ActiveMenuProps> = ({
  subLink,
  sideToggled,
  onShowSidebar,
  isActiveLink,
}) => {
  const navigate = useRouter();
  const {
    toggledTextStyles,
    linkStyle,
    setMenuItemTextStyle,
    setMenuItemPointStyle,
  } = useSideBarStyle({ sideToggled });
  const sidebarConditionInverse = useBreakpointValue({ base: false, lg: true });

  return (
    <Link
      key={subLink.path}
      {...linkStyle}
      ps={"10px"}
      p={"0"}
      onClick={() => {
        navigate.push(subLink?.path);
        if (!sidebarConditionInverse) {
          onShowSidebar();
        }
      }}
      h={"auto"}
    >
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        width="100%"
      >
        <Flex
          width={"full"}
          bgColor={
            isActiveLink(subLink?.path) ? hexToRGB("primary", 0.1) : "none"
          }
          gap={4}
          alignItems={"center"}
          borderRadius={"5px"}
          ms="10px"
          px={"10px"}
          py={"5px"}
        >
          {subLink?.icon ? (
            <subLink.icon
              width="22px"
              height="22px"
              fill={
                isActiveLink(subLink.path ?? "")
                  ? VariablesColors.primary
                  : VariablesColors.grayScale
              }
            />
          ) : (
            <Dot
              width="9px"
              height="9px"
              fill={setMenuItemPointStyle(subLink.path)}
            />
          )}
          <Text {...toggledTextStyles} {...setMenuItemTextStyle(subLink.path)}>
            {subLink?.label}
          </Text>
        </Flex>
      </Box>
    </Link>
  );
};
export default ActiveMenu;
