import React, { useRef } from "react";
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
import { HStack, IconButton, Flex, For, Link } from "@chakra-ui/react";
import { IoIosCloseCircle } from "react-icons/io";
import { BaseButton } from "_/components/custom/button";
import SwitchColorMode from "_/components/custom/switch-color/SwitchColorMode";
import { useRouter } from "next/navigation";
import { APP_ROUTES } from "_/app/config/routes";
import { useSelector, useDispatch } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import { keycloakSessionLogOut } from "_/app/hooks/logout";
import { signIn, signOut } from "next-auth/react";

const MobileMenu = ({
  onChange,
  open,
  isLoggedIn,
}: {
  open: boolean;
  onChange: (value: any) => void;
  isLoggedIn: boolean;
}) => {
  const fakeLink = [{ text: "Accueil", link: "/" }];
  const router = useRouter();
  const contentRef = useRef<React.RefObject<HTMLElement> | any>(null);

  return (
    <DrawerRoot
      open={open}
      onOpenChange={(e) => onChange(e.open)}
      size={"xs"}
      placement={"start"}
      closeOnEscape
    >
      <DrawerBackdrop />
      <DrawerContent height={"full"} pos={"absolute"} ref={contentRef}>
        <DrawerHeader>
          <HStack p={5} justifyContent={"space-between"}>
            <DrawerTitle onClick={() => router.push(APP_ROUTES.PUBLIC.HOME)}>
              E-Shop
            </DrawerTitle>
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
              {(item, index) => (
                <Link
                  key={index}
                  position="relative"
                  fontSize="20px"
                  textDecoration="none"
                  p="10px 20px"
                  href={item.link}
                  onClick={() => onChange(false)}
                >
                  {item.text}
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
            onClick={() => {
              if (isLoggedIn) {
                keycloakSessionLogOut().then(() =>
                  signOut({ callbackUrl: "/" }),
                );
                onChange(false);
              } else {
                signIn("keycloak");
                onChange(false);
              }
            }}
            withGradient
            colorType={!isLoggedIn ? "success" : "danger"}
            width={"full"}
          >
            {!isLoggedIn ? "Se connecter" : "Se deonnecter"}
          </BaseButton>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default MobileMenu;
