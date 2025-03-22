"use client";

import {
  Box,
  Center,
  Flex,
  Group,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import WebDisplay from "./WebDisplay";
import MobileMenu from "./MobileMenu";
import { ListMenu } from "_assets/svg";
import { TbUser } from "react-icons/tb";
import { useCart } from "_/app/hooks/cart";
import { CartComponents } from "./CartComponents";
import { useDispatch } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import { ModalComponent } from "_/components/custom/modal";
import { BaseText, TextVariant } from "_/components/custom/base-text";
import { BaseButton } from "_/components/custom/button";
import BreadcrumbNav from "_/components/custom/breadcrumb/BreadCrumbNav";
import { Avatar } from "_/components/ui/avatar";
import { clearPersistedStorage } from "_/utils/clear.store.utils";
import { signOut, useSession, signIn } from "next-auth/react";
import { decrypt } from "_/utils/encrypt";
import { Session } from "next-auth";

const Header = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const responsiveMode = useBreakpointValue({
    base: false,
    sm: false,
    lg: true,
  });
  const [open, setOpen] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const { data: session } = useSession() as { data: Session | null };
  const { removeFromCart, clearCart } = useCart();
  const isLoggedIn = !!session;

  const removeItem = (itemToRemove: { name: string; id: string }) => {
    setLoading(true);
    setTimeout(() => {
      removeFromCart(itemToRemove);
      setLoading(false);
    }, 1000);
  };

  const clearAllCartItems = () => {
    setLoading(true);
    setTimeout(() => {
      clearCart();
      setLoading(false);
    }, 1000);
  };

  async function keycloakSessionLogOut() {
    try {
      await fetch(`/api/auth/logout`, { method: "GET" });
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    //clearPersistedStorage();
    if (session && session?.access_token) {
      const decodeToken = decrypt(session?.access_token);
      dispatch(AuthModule.actions.setAccessToken(decodeToken));
    } else {
      dispatch(AuthModule.actions.clearAccessToken());
    }
  }, []);

  return (
    <Box>
      <Box display={{ base: "block", sm: "block", lg: "none" }}>
        <Flex
          m={{ base: "3" }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Flex alignItems={"center"} gap={5}>
            <IconButton
              bgColor={"white"}
              aria-label="menu"
              onClick={() => setOpen(true)}
            >
              <ListMenu />
            </IconButton>
            <BaseText variant={TextVariant.H3}>E-shop</BaseText>
          </Flex>
          <Flex gap={5} alignItems={"center"} justifyContent={"center"}>
            <IoIosHeartEmpty
              size={22}
              onClick={() => {
                isLoggedIn
                  ? router?.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_PROFILE)
                  : setInfoModal(true);
              }}
              cursor={"pointer"}
            />

            <CartComponents
              cart={cart}
              removeItem={removeItem}
              clearAllCartItems={clearAllCartItems}
              loading={loading}
            />
            {!isLoggedIn ? (
              <BaseButton
                colorType={"primary"}
                withGradient
                p={0}
                onClick={() => signIn("keycloak")}
                leftIcon={<TbUser size={18} />}
              />
            ) : (
              <Avatar
                name={isLoggedIn ? session?.user?.name || "" : ""}
                onClick={() =>
                  router.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_PROFILE)
                }
              />
            )}
          </Flex>
        </Flex>
        <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
          {({ values, handleSubmit, setFieldValue }) => (
            <Flex width={"full"} p={{ base: "3" }}>
              <FormTextInput
                name={"search"}
                placeholder="Recherchez votre produit"
                leftAccessory={<RiSearch2Line size={24} />}
                onChangeFunction={(e: any) => {
                  setFieldValue("search", e?.target.value);
                }}
                value={values?.search}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
            </Flex>
          )}
        </Formik>
        <Box m={{ base: "3" }}>
          <BreadcrumbNav />
        </Box>
      </Box>
      {responsiveMode ? (
        <WebDisplay
          cart={cart}
          setInfoModal={setInfoModal}
          isLoggedIn={isLoggedIn}
          removeItem={removeFromCart}
          clearAllCartItems={clearAllCartItems}
          loading={loading}
          name={"user"}
        />
      ) : (
        <MobileMenu
          open={open}
          onChange={() => setOpen(false)}
          isLoggedIn={isLoggedIn}
        />
      )}

      <ModalComponent
        title={"Information"}
        open={infoModal}
        onChange={() => setInfoModal(false)}
      >
        <Center flexDir={"column"} gap={5}>
          <BaseText
            lineHeight={1.5}
            variant={TextVariant.L}
            textAlign={"center"}
          >
            Vous devez vous connecter pour accéder à cette fonctionnalité
          </BaseText>

          <Group width={"full"} gap={5} flexDir={"column"}>
            <BaseButton
              width={"full"}
              colorType="primary"
              withGradient
              onClick={() => {
                router?.push(APP_ROUTES.PUBLIC.SIGN_IN);
                setInfoModal(false);
              }}
            >
              <BaseText>Se connecter</BaseText>
            </BaseButton>

            <BaseButton
              width={"full"}
              colorType={"secondary"}
              withGradient
              onClick={() => {
                router?.push(APP_ROUTES.PUBLIC.SIGN_UP);
                setInfoModal(false);
              }}
            >
              <BaseText>Creer un compte</BaseText>
            </BaseButton>
          </Group>
        </Center>
      </ModalComponent>
      {children}
    </Box>
  );
};

export default Header;
