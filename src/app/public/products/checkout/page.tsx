"use client";

import React, { useEffect } from "react";
import Header from "../../components/Header";
import { useCart } from "_/app/hooks/cart";
import { Box, Flex, For, Image, Separator, Stack } from "@chakra-ui/react";

import { TrashIcon } from "_assets/svg";
import { BaseButton } from "_components/custom/button";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_components/custom/base-text";
import { StepperInput } from "_components/ui/stepper-input";

const CheckOut = () => {
  const {
    cart,
    fetchCartFromStorage,
    setCart,
    triggerRefresh,
    removeFromCart,
  } = useCart();
  useEffect(() => {
    fetchCartFromStorage().then((data) => {
      setCart(data);
      console.log("data", data);
    });
  }, [triggerRefresh]);

  return (
    <Header>
      <Box mt={50} padding={{ base: 5, lg: 10 }}>
        <BaseText variant={TextVariant.H1}>Panier ({cart?.length})</BaseText>
        <Flex
          gap={10}
          mt={5}
          bgColor={"green"}
          boxShadow={"lg"}
          flexDir={{ base: "column", lg: "row" }}
        >
          <Box width={"full"} bgColor={"yellow"}>
            <For each={cart}>
              {(item, index) => (
                <Box key={index} width={"full"}>
                  <Flex
                    m={2}
                    gap={5}
                    alignItems={"flex-start"}
                    justifyContent={"space-between"}
                  >
                    <Flex alignItems={"flex-start"} gap={3}>
                      <Box boxSize={"150px"} bgColor={"yellow"} mb={4}>
                        <Image
                          src={
                            item?.images[0] ??
                            "https:avatar.iran.liara.run/public"
                          }
                          alt="cart-images"
                          width={"full"}
                          height={"full"}
                          objectFit="cover"
                        />
                      </Box>
                      <Box>
                        <Stack>
                          <BaseText truncate variant={TextVariant.H3}>
                            {item?.name}
                          </BaseText>
                          <BaseText variant={TextVariant.M}>
                            Vendeur : Test
                          </BaseText>
                          <BaseText
                            variant={TextVariant.XL}
                            weight={TextWeight.Regular}
                          >
                            {item.stock <= 4
                              ? "Quelques aticles restant"
                              : "Ne manquez pas cet article"}
                          </BaseText>
                        </Stack>
                      </Box>
                    </Flex>
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      bgColor={"pink"}
                    >
                      <BaseText
                        variant={TextVariant.H2}
                        fontWeight={TextWeight.Regular}
                      >
                        ${item?.price}
                      </BaseText>
                    </Flex>
                  </Flex>
                  <Flex justifyContent={"space-between"}>
                    <BaseButton
                      colorType={"danger"}
                      withGradient
                      leftIcon={<TrashIcon fill={"#fff"} />}
                      onClick={() => {
                        removeFromCart(item);
                      }}
                      disabled={triggerRefresh}
                      isLoading={triggerRefresh}
                    >
                      Supprimer
                    </BaseButton>
                    <StepperInput
                      defaultValue={item?.quantity?.toString()}
                      min={1}
                      max={item?.stock}
                      disabled={false}
                      onValueChange={(e) =>
                        console.log(e.value as unknown as number)
                      }
                    />
                  </Flex>
                  <Separator mt={3} mb={3} />
                </Box>
              )}
            </For>
          </Box>

          <Box width={"1/3"} bgColor={"blue"}>
            Display resume here
          </Box>
        </Flex>
      </Box>
    </Header>
  );
};

export default CheckOut;
