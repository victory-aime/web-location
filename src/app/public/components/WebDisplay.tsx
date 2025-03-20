import { Box, Flex } from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { BaseButton } from "_/components/custom/button";
import { FormTextInput } from "_/components/custom/form";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiSearch2Line } from "react-icons/ri";
import { CartComponents } from "./CartComponents";
import { BaseText, TextVariant } from "_components/custom/base-text";
import { Avatar } from "_/components/ui/avatar";

const WebDisplay = ({
  cart,
  removeItem,
  clearAllCartItems,
  loading,
  isLoggedIn,
  setInfoModal,
  name,
}: {
  cart: any[];
  removeItem: (item: { id: string; name: string }) => void;
  clearAllCartItems: () => void;
  loading: boolean;
  isLoggedIn: boolean;
  setInfoModal: (value: boolean) => void;
  name: string;
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
        <BaseText variant={TextVariant.L}> E-Shop</BaseText>
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
          <IoIosHeartEmpty
            size={24}
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
        </Flex>
        {!isLoggedIn ? (
          <BaseButton
            onClick={() => router?.push(APP_ROUTES.PUBLIC.SIGN_IN)}
            colorType={"primary"}
          >
            <BaseText variant={TextVariant.XS}>Se connecter </BaseText>
          </BaseButton>
        ) : (
          <Avatar
            name={name}
            boxSize={"45px"}
            cursor={"pointer"}
            onClick={() =>
              router.push(APP_ROUTES.PRIVATE.CLIENT.MANAGE_PROFILE)
            }
          />
        )}
      </Flex>
    </Flex>
  );
};

export default WebDisplay;
