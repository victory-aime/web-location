import { Box, Link, Text, useBreakpointValue } from "@chakra-ui/react";
import { FC } from "react";
import useSideBarStyle from "../hooks/useSideBarStyle";
import { SimpleSubItem } from "../types";
import { useRouter } from "next/navigation";
import { Dot } from "_assets/svg";

interface ActiveMenuProps {
  subLink: SimpleSubItem;
  sideToggled: boolean;
  onShowSidebar: any;
}
const ActiveMenu: FC<ActiveMenuProps> = ({
  subLink,
  sideToggled,
  onShowSidebar,
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
      ps={"15px"}
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
        borderRadius="10px"
        width="100%"
        p="5px 10px"
      >
        <Box mt={"-2px"} ms={"4px"} mr={"10px"}>
          <Dot fill={setMenuItemPointStyle(subLink.path)} width={"9px"} />
        </Box>
        <Text {...toggledTextStyles} {...setMenuItemTextStyle(subLink.path)}>
          {subLink?.label}
        </Text>
      </Box>
    </Link>
  );
};
export default ActiveMenu;
