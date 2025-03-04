import React from "react";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "_components/ui/drawer";
import { HStack, IconButton, Flex, For, Link, Text } from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { BaseButton } from "_/components/custom/button";
import SwitchColorMode from "_/components/custom/switch-color/SwitchColorMode";

const MobileMenu = ({
  open,
  onChange,
}: {
  open: boolean;
  onChange: (value: any) => void;
}) => {
  const fakeLink = [{ text: "Accueil", link: "/" }];
  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => onChange(e.open)}
      size={"xs"}
      placement={"start"}
      closeOnEscape
    >
      <DrawerBackdrop />
      <DrawerContent height={"full"} pos={"absolute"}>
        <DrawerHeader>
          <HStack p={5} justifyContent={"space-between"}>
            <DrawerTitle>E-Shop</DrawerTitle>
            <DrawerActionTrigger asChild>
              <IconButton
                aria-label="close-drawer"
                bgColor={"gray.500"}
                color={"white"}
                onClick={() => onChange(false)}
              >
                <IoIosCloseCircle />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody>
          <Flex flexDir={"column"} gap={5}>
            <For each={fakeLink}>
              {(item: { text: string; link: string }, index: number) => (
                <Link
                  key={index}
                  position="relative"
                  fontSize="20px"
                  textDecoration="none"
                  href={item.link}
                  p="10px 20px"
                  _hover={{ textDecoration: "none" }}
                >
                  <Text>{item.text}</Text>
                </Link>
              )}
            </For>
          </Flex>
        </DrawerBody>
        <DrawerFooter
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          width={"full"}
          p={5}
        >
          <SwitchColorMode />

          <BaseButton
            onClick={() => {}}
            withGradient
            colorType={"success"}
            width={"full"}
          >
            Se connecter
          </BaseButton>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileMenu;
