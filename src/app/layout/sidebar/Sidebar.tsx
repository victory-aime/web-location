import { Box, Flex, useBreakpointValue, VStack } from "@chakra-ui/react";
import RenderLinks from "./components/RenderLinks";
import Image from "next/image";
import useSideBarStyle from "./hooks/useSideBarStyle";
import { adminMenu } from "./sideBarRoutes";
import { SideBarProps } from "./types";
import { VariablesColors } from "_theme/variables";
import { useDispatch, useSelector } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import MobileSidebar from "./components/MobileSidebar";
import { BaseButton } from "_/components/custom/button";
import { LogOutIcon } from "_assets/svg";
import SwitchColorMode from "_/components/custom/switch-color/SwitchColorMode";

const SideBar = ({ sideToggled, onShowSidebar, currentUser }: SideBarProps) => {
  const { toggledSideBarStyle } = useSideBarStyle({
    sideToggled,
  });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const dispatch = useDispatch();
  const { isLogout } = useSelector(AuthModule.selectors.authSelector);

  const handleLogout = () => {
    dispatch(AuthModule.actions.authLogoutRequestAction());
  };

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          isOpen={sideToggled}
          onClose={onShowSidebar}
          handleLogout={handleLogout}
          currentUser={currentUser}
        />
      ) : (
        <Box {...toggledSideBarStyle} className="sidebar">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={onShowSidebar}
            mt={sideToggled ? 0 : 30}
            cursor="pointer"
          >
            {sideToggled ? (
              <Flex
                width={"full"}
                minH={"100px"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Image
                  src={"/assets/images/mouse.png"}
                  draggable={false}
                  alt={"logo-company"}
                  width={120}
                  height={120}
                />
              </Flex>
            ) : (
              <Image
                src={"/assets/images/mouse.png"}
                alt={"logo-company"}
                width={50}
                height={50}
              />
            )}
          </Box>
          <VStack align="stretch" height="65%" overflow="auto">
            <RenderLinks
              links={adminMenu}
              sideToggled={sideToggled}
              onShowSidebar={onShowSidebar}
            />
          </VStack>

          <Box pe={"10px"} ps={"10px"}>
            <SwitchColorMode />
            <BaseButton
              width={"full"}
              withGradient
              colorType={"danger"}
              overflow={"hidden"}
              justifyContent={"center"}
              onClick={handleLogout}
              leftIcon={
                <LogOutIcon
                  width="18px"
                  height="18px"
                  fill={VariablesColors.white}
                />
              }
            >
              {sideToggled ? "Deconnexion" : null}
            </BaseButton>
          </Box>
        </Box>
      )}
    </>
  );
};

export default SideBar;
