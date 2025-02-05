import { Box, Text } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { useRouter } from "next/navigation";
import React from "react";

const LinkFooter = () => {
  const navigate = useRouter();
  return (
    <Box
      flex={1}
      display={{ base: "none", md: "flex" }}
      justifyContent={"start"}
    >
      <Text
        mr={"8px"}
        color="white"
        cursor={"pointer"}
        textDecoration="underline"
        onClick={() => navigate.push(APP_ROUTES.PUBLIC.SECURITY_MENTION)}
      >
        FAQ
      </Text>
      <Text
        mr={"8px"}
        cursor={"pointer"}
        color="white"
        textDecoration="underline"
        onClick={() => navigate.push(APP_ROUTES.PUBLIC.SECURITY_MENTION)}
      >
        Security Mention
      </Text>
      <Text
        mr={"8px"}
        cursor={"pointer"}
        color="white"
        textDecoration="underline"
        onClick={() => navigate.push(APP_ROUTES.PUBLIC.LEGAL_NOTICE)}
      >
        legal notice
      </Text>
      <Text
        mr={"8px"}
        cursor={"pointer"}
        color="white"
        textDecoration="underline"
        onClick={() => navigate.push(APP_ROUTES.PUBLIC.SECURITY_MENTION)}
      >
        contact-us
      </Text>
    </Box>
  );
};
export default LinkFooter;
