"use client";
import {
  Badge,
  Box,
  Button,
  Center,
  Flex,
  For,
  Group,
  Heading,
  HStack,
  StepsTitle,
  Text,
  VStack,
} from "@chakra-ui/react";
import { APP_ROUTES } from "_/app/config/routes";
import { CustomBadge } from "_/components/custom/badge";
import { ActionsButton } from "_/components/custom/button";
import BoxContainer from "_/components/custom/container/BoxContainer";
import { useRouter, useSearchParams } from "next/navigation";
import { IoCalendar } from "react-icons/io5";

import React, { useState } from "react";
import { VariablesColors } from "_/theme/variables";
import {
  StepsRoot,
  StepsCompletedContent,
  StepsContent,
  StepsItem,
  StepsList,
  StepsNextTrigger,
  StepsPrevTrigger,
} from "_/components/ui/steps";
import { LuUser, LuWallet, LuCalendar } from "react-icons/lu";
import { ColumnsDataTable } from "_/components/custom/data-table/interface/data-types";
import { RenderProductImage } from "../../products/components";
import { ordersDetailsData } from "../data/data";
import { CommonDataTable } from "_/components/custom/data-table";
import ProtectedRoute from "_/app/layout-container/protected/PrivateDashboardLayout";

const DetailsPage = () => {
  const data = useSearchParams()?.get("orderId");
  const pageSize = 5;
  const totalPages = Math.ceil(ordersDetailsData?.length / pageSize);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const columns: ColumnsDataTable[] = [
    {
      header: "Produits",
      accessor: "product",
      cell: (value) => {
        return <RenderProductImage value={value} />;
      },
    },
    {
      header: "Total produits",
      accessor: "numberOfProducts",
    },
    {
      header: "Prix",
      accessor: "price",
    },
    {
      header: "Total",
      accessor: "totalAmount",
    },
  ];
  return (
    <ProtectedRoute>
      <Box w={"full"} mt={"30px"}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDirection={{ base: "column", md: "row" }}
          gap={4}
        >
          <Heading>Details de la commande</Heading>
          <ActionsButton
            cancelTitle={"annuler"}
            goBackUrl={APP_ROUTES.PRIVATE.ECOMMERCE.ORDER.LIST}
            validateTitle={"Ajouter"}
            onClick={() => {}}
          />
        </Flex>
        <HStack gap={4} mt={10} flexDir={{ base: "column", md: "row" }}>
          <For each={Array.from({ length: 3 }, (_, i) => i) ?? []}>
            {(item, index) => (
              <BoxContainer key={index}>
                <Flex
                  gap={3}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Heading>Commande N°{data}</Heading>
                  <CustomBadge />
                </Flex>
                <VStack width={"full"} gap={5} mt={5}>
                  <For each={Array.from({ length: 3 }, (_, i) => i) ?? []}>
                    {(item, index) => (
                      <HStack
                        key={index}
                        width={"full"}
                        gap={2}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Flex
                          alignItems={"center"}
                          justifyContent={"center"}
                          gap={2}
                        >
                          <Flex
                            color={VariablesColors.primary}
                            bgColor={"whiteAlpha.300"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            p={"10px"}
                            borderRadius={"7px"}
                          >
                            <IoCalendar />
                          </Flex>
                          <Text>Date</Text>
                        </Flex>
                        <Text>12 Dec 2022</Text>
                      </HStack>
                    )}
                  </For>
                </VStack>
              </BoxContainer>
            )}
          </For>
        </HStack>
        <Flex
          p={2}
          flexDir={{ base: "column", md: "row" }}
          width={"full"}
          justifyContent={"space-between"}
          gap={10}
          mt={"30px"}
        >
          <VStack width={"100%"} alignItems={"flex-start"} gap={4}>
            <Flex alignItems={"center"} gap={4}>
              <Text>Recent Orders</Text>
              <Badge rounded={"full"} p={2} bgColor={"primary.500"}>
                +{2} orders
              </Badge>
            </Flex>
            <Box mt={10} width={"full"}>
              <CommonDataTable
                data={ordersDetailsData}
                columns={columns}
                initialPage={1}
                totalItems={totalPages}
                pageSize={pageSize}
                handleRowSelection={setSelectedRows}
                hidePagination
                lazy
              />
            </Box>
          </VStack>
          <Box width={{ base: "100%", md: "1/3" }}>
            <BoxContainer>
              <Heading>Etat de la commande</Heading>
              <Box height={"100%"} mt={5}>
                <StepsRoot
                  orientation={"vertical"}
                  minHeight={{ base: "100%", md: "300px" }}
                  w={"100%"}
                  defaultValue={1}
                  count={3}
                >
                  <StepsList>
                    <StepsItem index={0} icon={<LuUser />} />
                    <StepsItem index={1} icon={<LuWallet />} />
                    <StepsItem index={2} icon={<LuCalendar />} />
                  </StepsList>

                  <VStack width={"full"}>
                    <StepsContent index={0}>
                      <VStack
                        gap={4}
                        mt={{ base: "4", md: "unset" }}
                        w={{
                          base: "-webkit-fill-available",
                          sm: "-webkit-fill-available",
                          md: "auto",
                        }}
                        maxWidth={{ base: "100%", sm: "max-content" }}
                      >
                        <Box
                          flexShrink="0"
                          p={{ base: "4px", md: "unset" }}
                          alignSelf="flex-start"
                          maxWidth="max-content"
                        >
                          <StepsTitle>Step 1</StepsTitle>
                        </Box>
                        <VStack alignItems={"flex-start"}>
                          <Text>Nouvelle commande</Text>
                          <Text>12/12/2024, 18h.00min</Text>
                        </VStack>
                      </VStack>
                    </StepsContent>
                    <StepsContent index={1}>
                      <VStack
                        gap={8}
                        mt={{ base: "4", md: "unset" }}
                        w={{
                          base: "-webkit-fill-available",
                          sm: "-webkit-fill-available",
                          md: "auto",
                        }}
                        maxWidth={{ base: "100%", sm: "max-content" }}
                      >
                        <Box
                          flexShrink="0"
                          p={{ base: "4px", md: "unset" }}
                          ml={"5px"}
                          alignSelf="baseline"
                          maxWidth="max-content"
                        >
                          <StepsTitle>Step 2</StepsTitle>
                        </Box>
                        <Center>
                          <Text>Commande en cours de traitement</Text>
                          <Text>13/12/2024, 10h.00min</Text>
                        </Center>
                      </VStack>
                    </StepsContent>
                    <StepsContent index={2}>
                      <VStack
                        gap={8}
                        mt={{ base: "4", md: "unset" }}
                        w={{
                          base: "-webkit-fill-available",
                          sm: "-webkit-fill-available",
                          md: "auto",
                        }}
                        maxWidth={{ base: "100%", sm: "max-content" }}
                      >
                        <Box
                          flexShrink="0"
                          p={{ base: "4px", md: "unset" }}
                          ml={"5px"}
                          alignSelf="baseline"
                          maxWidth="max-content"
                        >
                          <StepsTitle>Step 3</StepsTitle>
                        </Box>
                        <Center>
                          <Text>Commande livree</Text>
                          <Text>14/12/2024, 15h.00min</Text>
                        </Center>
                      </VStack>
                    </StepsContent>
                  </VStack>
                  <StepsCompletedContent>
                    All steps are complete!
                  </StepsCompletedContent>
                </StepsRoot>
              </Box>
            </BoxContainer>
          </Box>
        </Flex>
      </Box>
    </ProtectedRoute>
  );
};

export default DetailsPage;
