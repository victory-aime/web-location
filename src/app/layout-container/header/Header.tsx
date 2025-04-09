import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { ListMenu } from "_assets/svg";
import { SideBarProps } from "../sidebar/types";
import { useEffect } from "react";
import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { UsersModule } from "_store/src/modules";
import { useSession } from "next-auth/react";

const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const { user } = useSelector(UsersModule.selectors.userSelector);
  const dispatch = useDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (isEmpty(user) && session?.keycloakId && status === "authenticated") {
      dispatch(
        UsersModule.actions.userInfoRequestAction({
          userId: session?.keycloakId ?? "",
        }),
      );
    }
  }, [session, status]);

  return (
    <Flex
      as="header"
      p={4}
      justify={"space-between"}
      alignItems="center"
      boxShadow={"0 0 35px black.50"}
      position={"relative"}
      h={{ base: "100px", md: "auto" }}
    >
      <Box
        ms={"2px"}
        display="flex"
        alignItems="center"
        onClick={onShowSidebar}
        cursor="pointer"
      >
        <ListMenu width={25} height={25} />
      </Box>

      <Box ms={5} display="flex" alignItems="center">
        <Flex
          alignItems={{ base: "center", md: "flex-start" }}
          justifyContent={"flex-end"}
          flexDir={{ base: "row", md: "row-reverse" }}
          gap={3}
          width={"100%"}
        >
          <Box
            display={{ base: "flex", md: "block" }}
            truncate
            maxW={"200px"}
            flexWrap={"wrap"}
            color={"gray.400"}
            fontSize={"13px"}
          >
            <Text>Bonjour,</Text>
            <Text> {user?.name ?? ""}</Text>
          </Box>
          <Image
            draggable="false"
            src={"https://avatar.iran.liara.run/public"}
            boxSize={"30px"}
            borderRadius={"7px"}
            fit="cover"
            objectPosition="center"
            alt="img-url"
          />
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
