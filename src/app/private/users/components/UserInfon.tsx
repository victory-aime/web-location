import { Box, Flex, VStack, Text, Separator } from "@chakra-ui/react";
import { keycloakSessionLogOut } from "_/app/hooks/logout";
import { BaseText } from "_/components/custom/base-text";
import { BaseButton } from "_/components/custom/button";
import { Avatar } from "_/components/ui/avatar";
import { TYPES } from "_/store/src";
import { hexToRGB } from "_/theme/colors";
import { signOut, useSession } from "next-auth/react";
import React, { Dispatch, SetStateAction } from "react";
import { BsCart, BsHeart } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi2";
import { IoIosCog } from "react-icons/io";
import { LuMapPin } from "react-icons/lu";

interface Props {
  currentStep: number | string | null;
  onChangeStep: Dispatch<SetStateAction<number>>;
}

const UserInfo = ({ currentStep, onChangeStep }: Props) => {
  const { data: session, status } = useSession();
  const renderStepMap = [
    {
      icon: <HiOutlineUser />,
      title: "Informations personnelles",
    },
    {
      icon: <LuMapPin />,
      title: "Gerer mes addresses",
    },
    {
      icon: <BsHeart />,
      title: "My Wishlist",
    },
    {
      icon: <IoIosCog />,
      title: "Parametres",
    },
    {
      icon: <BsCart />,
      title: "Mes commandes",
    },
  ];

  return (
    <Box
      width={{ base: "full", lg: "1/3" }}
      borderRadius={"7px"}
      height={{ base: "fit-content", lg: "500px" }}
      boxShadow={"lg"}
    >
      <Box
        pl={"10px"}
        pr={"10px"}
        mt={"30px"}
        mb={"30px"}
        display={"flex"}
        flexDir={"row"}
        alignItems={"center"}
        gap={2}
      >
        <Avatar size={"xl"} />
        <Box>
          <BaseText>Bonjour,👋</BaseText>
          <Text>{session?.user?.name}</Text>
        </Box>
      </Box>
      <Separator mt={4} mb={4} />
      <VStack
        alignItems={"flex-start"}
        pl={"10px"}
        pr={"10px"}
        mt={"30px"}
        mb={"30px"}
      >
        {renderStepMap?.map((item, index) => (
          <Flex
            key={index}
            width={"100%"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            borderRadius={currentStep === index ? "7px" : ""}
            onClick={() => {
              onChangeStep(index);
            }}
            bgColor={currentStep === index ? hexToRGB("blue", 0.5) : ""}
            p={"10px"}
            _hover={{
              background: hexToRGB("blue", 0.5),
              borderRadius: "7px",
              cursor: "pointer",
            }}
            gap={"20px"}
          >
            {item.icon}
            <BaseText>{item.title}</BaseText>
          </Flex>
        ))}

        {status === "authenticated" && (
          <BaseButton
            onClick={() =>
              keycloakSessionLogOut().then(() =>
                signOut({ callbackUrl: process.env.NEXTAUTH_URL })
              )
            }
            width={"full"}
            colorType={"danger"}
            withGradient
          >
            Deconnexion
          </BaseButton>
        )}
      </VStack>
    </Box>
  );
};

export default UserInfo;
