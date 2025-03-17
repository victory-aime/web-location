import { Center } from "@chakra-ui/react";
import { BaseText } from "_/components/custom/base-text";
import BoxContainer from "_/components/custom/container/BoxContainer";
import React from "react";
import Image from "next/image";

const Favourite = () => {
  return (
    <BoxContainer border={"none"} p={{ base: 5, md: 10 }}>
      <Center flexDir={"column"} gap={2}>
        <Image
          src={"/assets/images/sorry.jpg"}
          alt={"sorry-image"}
          width={300}
          height={300}
        />
        <BaseText>Desole cette page est en cours de maintenance</BaseText>
      </Center>
    </BoxContainer>
  );
};

export default Favourite;
