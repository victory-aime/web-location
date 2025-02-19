import {
  Box,
  Flex,
  LinkBox,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import RenderLinks from "./components/RenderLinks";
import Image from "next/image";
import useSideBarStyle from "./hooks/useSideBarStyle";
import { adminMenu } from "./sideBarRoutes";
import { SideBarProps } from "./types";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_app/config/routes";
import { LogOutIcon } from "_assets/svg";
import { VariablesColors } from "_theme/variables";
import { useDispatch, useSelector } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import MobileSidebar from "./components/MobileSidebar";

const SideBar = ({ sideToggled, onShowSidebar }: SideBarProps) => {
  const { toggledSideBarStyle, toggledTextStyles } = useSideBarStyle({
    sideToggled,
  });
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useRouter();
  const dispatch = useDispatch();
  const {} = useSelector(AuthModule.selectors.authSelector);

  const handleLogout = () => {
    dispatch(AuthModule.actions.authLogoutRequestAction());
    navigate.push(APP_ROUTES.PUBLIC.SIGN_IN);
  };

  return (
    <>
      {isMobile ? (
        <MobileSidebar
          isOpen={sideToggled}
          onClose={onShowSidebar}
          handleLogout={handleLogout}
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
          <LinkBox
            style={{
              position: "relative",
              height: "40px",
              marginTop: "10px",
              gap: "10px",
              padding: "14px",
            }}
            cursor="pointer"
            onClick={handleLogout}
          >
            <Flex
              align="center"
              justifyContent="center"
              width="100%"
              height="100%"
              ps={{ base: "0", md: "20px" }}
            >
              <LogOutIcon
                width="18px"
                height="18px"
                fill={VariablesColors.grayScale}
              />
              <Text
                display={
                  sideToggled ? { base: "none", lg: "block" } : { lg: "none" }
                }
                {...toggledTextStyles}
                ms="1rem"
              >
                Deconnexion
              </Text>
            </Flex>
          </LinkBox>
        </Box>
      )}
    </>
  );
};

export default SideBar;
