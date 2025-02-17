import { Box, Text, BoxProps, Image } from "@chakra-ui/react";
import React, { FC } from "react";

interface NoDataFoundProps {
  title?: string;
  containerStyle?: BoxProps;
  isPublic?: boolean;
}

const NoDataFound: FC<NoDataFoundProps> = ({
  title = "Oooup's aucune donnees",
  containerStyle,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap="1rem"
      width="100%"
      {...containerStyle}
    >
      <Image
        width={{ base: "100%", md: "20%" }}
        src={"/assets/svg/no-data-found-V2.svg"}
        alt="no-data-found"
        transition={"filter 0.5s ease, opacity 0.5s ease"}
        draggable={false}
      />

      <Text textAlign={"center"} fontSize={{ base: "15px", md: "18px" }}>
        {title}
      </Text>
    </Box>
  );
};

export default NoDataFound;
