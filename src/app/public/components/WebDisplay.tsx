import { Flex, Box, Text, Float, Circle } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { FormTextInput } from "_/components/custom/form";
import { TrashLottieAnimationV2 } from "_lottie/animations/LottieAnimation";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { MenuContent, MenuRoot, MenuTrigger } from "_components/ui/menu";
import DisplayCartItems from "../products/components/DisplayCartItems";

const WebDisplay = () => {
  const router = useRouter();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  return (
    <Flex
      width={"full"}
      alignItems={"center"}
      justifyContent={"space-between"}
      flexDir={{ base: "column", lg: "row" }}
      gap={5}
      p={5}
    >
      <Box
        width={"full"}
        cursor={"pointer"}
        onClick={() => router.push(APP_ROUTES.PUBLIC.HOME)}
      >
        <Text fontSize={"35px"}> E-Shop</Text>
      </Box>

      <Formik initialValues={{ search: "" }} onSubmit={() => {}}>
        {({ values, handleSubmit, setFieldValue }) => (
          <Flex width={"full"}>
            <FormTextInput
              name={"search"}
              placeholder="Recherchez votre produit"
              leftAccessory={<RiSearch2Line />}
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

      <Flex
        alignItems={"center"}
        justifyContent={"flex-end"}
        width={"full"}
        gap={8}
      >
        <Flex gap={5} alignItems={"center"} justifyContent={"center"}>
          <IoIosHeartEmpty size={24} />

          <MenuRoot>
            <MenuTrigger asChild>
              <Box position="relative" cursor={"pointer"}>
                {cart?.length > 0 && (
                  <Float>
                    <Circle size="5" bg="red" color="white">
                      {cart?.length}
                    </Circle>
                  </Float>
                )}
                <FaCartShopping size={22} />
              </Box>
            </MenuTrigger>
            <MenuContent p={5}>
              {cart === 0 ? (
                <Flex
                  alignItems={"center"}
                  justifyContent={"center"}
                  boxSize={"45px"}
                >
                  <TrashLottieAnimationV2 />
                </Flex>
              ) : (
                <DisplayCartItems items={cart} />
              )}
            </MenuContent>
          </MenuRoot>
        </Flex>
        <BaseButton onClick={() => router?.push(APP_ROUTES.PUBLIC.SIGN_IN)}>
          Se connecter
        </BaseButton>
      </Flex>
    </Flex>
  );
};

export default WebDisplay;
