"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Flex, VStack, Text, Stack, HStack, For } from "@chakra-ui/react";
import { getTokenOrThrow } from "_/utils/auth/check-token";
import { useSelector } from "react-redux";
import { AuthModule } from "_/store/src/modules";
import BoxContainer from "_/components/custom/container/BoxContainer";
import { BaseButton } from "_/components/custom/button";
import ImageRatio from "_/components/custom/aspect-ratio/ImageRatio";
import {
  BaseText,
  TextVariant,
  TextWeight,
} from "_/components/custom/base-text";
import { CustomFormatNumber } from "_/components/custom/format-number";
import { CustomBadge } from "_/components/custom/badge";

const MyOrder = () => {
  const [data, setData] = useState<any[]>([]);
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const token = getTokenOrThrow();

  const fetchUserOrderList = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/_api/v1/secure/order/user-order-list?userId=${currentUser?.id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      console.log("response ====", response.data);
      setData(response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des commandes", error);
    }
  };

  useEffect(() => {
    fetchUserOrderList();
  }, []);

  return (
    <Box width={"full"}>
      {data?.length > 0 ? (
        <BoxContainer p={4}>
          <For each={data}>
            {(order, orderIndex) => (
              <Box key={orderIndex} width={"full"}>
                <For each={order?.items}>
                  {(item: any, itemIndex: number) => (
                    <Flex
                      key={itemIndex}
                      gap={4}
                      mt={3}
                      flexDir={{ base: "column", md: "row" }}
                      alignItems={"flex-start"}
                      justifyContent={"space-between"}
                      width={"full"}
                    >
                      <Box width={"full"}>
                        <ImageRatio
                          image={item?.product?.image}
                          ratio={{ base: 1, md: 16 / 9 }}
                        />
                        <Flex gap={3} mt={4}>
                          <CustomBadge type={"order"} status={order?.status} />
                          <BaseText variant={TextVariant.S}>
                            Votre commande est en attente de validation
                          </BaseText>
                        </Flex>
                      </Box>

                      <VStack width={"full"} gap={5} alignItems={"flex-start"}>
                        <Stack gap={2} width={"full"}>
                          <BaseText
                            variant={TextVariant.H3}
                            weight={TextWeight.Medium}
                          >
                            {item?.product?.name}
                          </BaseText>
                          <BaseText variant={TextVariant.M}>
                            Prix:
                            <CustomFormatNumber
                              value={item?.product?.productPrice}
                            />
                          </BaseText>
                          <BaseText variant={TextVariant.M}>
                            Quantité: {item.quantity}
                          </BaseText>
                          <Flex gap={2}>
                            <BaseText variant={TextVariant.M}>
                              Magasin:
                            </BaseText>
                            <BaseText
                              color={"blue.500"}
                              variant={TextVariant.M}
                            >
                              {item?.store?.name}
                            </BaseText>
                          </Flex>
                        </Stack>
                        <BaseButton
                          colorType={
                            order?.staus !== "NEW" ? "danger" : "primary"
                          }
                        >
                          {order?.status !== "NEW"
                            ? "Notez cette article"
                            : "Annuler la commande"}
                        </BaseButton>
                      </VStack>
                    </Flex>
                  )}
                </For>
              </Box>
            )}
          </For>
        </BoxContainer>
      ) : (
        <BaseText textAlign="center">Aucune commande trouvée</BaseText>
      )}
    </Box>
  );
};

export default MyOrder;
