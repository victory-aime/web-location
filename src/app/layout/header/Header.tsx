import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { ListMenu } from "_assets/svg";

interface Props {
  onShowSidebar?: () => void;
  showSidebarButton?: boolean;
}

const Header = ({ showSidebarButton = true, onShowSidebar }: Props) => {
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
      {showSidebarButton && (
        <Box
          ms={"2px"}
          display="flex"
          alignItems="center"
          onClick={onShowSidebar}
          cursor="pointer"
        >
          <ListMenu width={25} height={25} />
        </Box>
      )}
      <Box ms={5} display="flex" alignItems="center">
        <Flex
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={5}
          width={"100%"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={"15px"}>
            <Text color={"gray.400"}>{"COMMON.HELLO"} , </Text>
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
        </Flex>
      </Box>
    </Flex>
  );
};

export default Header;
