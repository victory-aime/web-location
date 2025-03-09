import { Flex, Box, Text } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { CartComponents } from "./CartComponents";

const WebDisplay = ({
  cart,
  removeItem,
  clearAllCartItems,
  loading,
}: {
  cart: any[];
  removeItem: (item: { id: string; name: string }) => void;
  clearAllCartItems: () => void;
  loading: boolean;
}) => {
  const router = useRouter();

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

      <Flex
        alignItems={"center"}
        justifyContent={"flex-end"}
        width={"full"}
        gap={8}
      >
        <Flex gap={5} alignItems={"center"} justifyContent={"center"}>
          <IoIosHeartEmpty size={24} />
          <CartComponents
            cart={cart}
            removeItem={removeItem}
            clearAllCartItems={clearAllCartItems}
            loading={loading}
          
          />
        </Flex>
        <BaseButton onClick={() => router?.push(APP_ROUTES.PUBLIC.SIGN_IN)}>
          Se connecter
        </BaseButton>
      </Flex>
    </Flex>
  );
};

export default WebDisplay;
