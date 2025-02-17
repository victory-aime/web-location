"use client";

import {
  Box,
  Flex,
  HStack,
  Heading,
  Separator,
  VStack,
  Text,
  createListCollection,
} from "@chakra-ui/react";
import { ActionsButton, BaseButton } from "_/components/custom/button";
import React, { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import {
  FormTextInput,
  FormTextArea,
  FormSelect,
} from "_/components/custom/form";
import { Formik, Form } from "formik";
import { CustomDragDropZone } from "_/components/custom/drag-drop/";
import { LuBadgeDollarSign } from "react-icons/lu";
import { Checkbox } from "_/components/ui/checkbox";
import { ProductContainer } from "../components";
import { APP_ROUTES } from "_/app/config/routes";

const AddProductPage = () => {
  const router = useRouter();
  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);

  const frameworks = createListCollection({
    items: [
      { label: "React.js", value: "react" },
      { label: "Vue.js", value: "vue" },
      { label: "Angular", value: "angular" },
      { label: "Svelte", value: "svelte" },
    ],
  });

  return (
    <Box w={"full"} mt={"30px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        gap={4}
      >
        <Heading>Ajouter un produit</Heading>
        <ActionsButton
          cancelTitle={"annuler"}
          goBackUrl={APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST}
          validateTitle={"Ajouter"}
          onClick={() => {}}
        />
      </Flex>
      <Flex
        alignItems={"flex-start"}
        justifyContent={"flex-start"}
        flexDirection={{ base: "column", md: "row" }}
        mt={"50px"}
        gap={4}
      >
        <VStack alignItems={"flex-start"} gap={8} width={"full"}>
          <ProductContainer
            title={"Informations Generales"}
            tooltip={"Saisir les informations generales du produit"}
          >
            <Formik
              enableReinitialize
              initialValues={{
                productName: "",
                productDesc: "",
              }}
              onSubmit={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={10} gap={4} align="stretch" width="100%">
                    <FormTextInput
                      name="productName"
                      label="Nom"
                      placeholder="john"
                    />
                    <FormTextArea
                      name={"productDesc"}
                      label={"Description"}
                      placeholder={"Saisissez la description du produit ici..."}
                      onChangeFunction={(e: any) =>
                        setFieldValue("productDesc", e.target.value)
                      }
                    />
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
          <ProductContainer
            title={"Images"}
            tooltip={"Ajouter des images du produit"}
          >
            <CustomDragDropZone getFilesUploaded={setFilesUploaded} />
          </ProductContainer>
          <ProductContainer
            title={"Tariification"}
            tooltip={"Saisir les informations de tarification du produit"}
          >
            <Formik
              enableReinitialize
              initialValues={{
                productPrice: "",
                productDiscount: "",
                productDesc: "",
              }}
              onSubmit={() => {}}
              validationSchema={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={10} gap={4} align="stretch" width="100%">
                    <HStack width={"full"} gap={4}>
                      <FormTextInput
                        name="productPrice"
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Prix initial"
                        placeholder="Type base price here. . ."
                      />
                      <FormTextInput
                        name="productDiscount"
                        label="Prix avant reduction"
                        toolTipInfo={
                          "Pour afficher un prix barré, entrez une valeur supérieure à votre prix.Souvent afficher avec un prix barre"
                        }
                        placeholder="john"
                      />
                    </HStack>
                    <Separator />
                    <HStack gap={4} direction={{ base: "column", md: "row" }}>
                      <FormTextInput
                        name="name"
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Cout par article"
                        placeholder="0,00"
                        toolTipInfo="Le cout par article est le prix que vous payez pour chaque article que vous vendez.Cette information est utilisée pour calculer votre bénéfice et elle ne sera pas visible par les clients."
                      />

                      <FormTextInput
                        name="name"
                        label="Profit par article"
                        placeholder="john"
                      />
                      <FormTextInput
                        name="name"
                        label="Marge de profit"
                        placeholder="john"
                      />
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
          <ProductContainer
            title={"Stock"}
            tooltip={"Saisir les informations de stock du produit"}
          >
            <Text mt={10}>Quantite</Text>
            <Separator mt={5} />
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                productDesc: "",
              }}
              onSubmit={() => {}}
              validationSchema={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={5} gap={4} width="full">
                    <HStack
                      width={"full"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      mb={4}
                    >
                      <Box width={"full"}>
                        <Text>Shop location</Text>
                      </Box>
                      <Box width={{ base: "100%", md: "1/4" }}>
                        <FormTextInput
                          name="ctx"
                          type={"number"}
                          min={0}
                          max={1000}
                          placeholder="0"
                        />
                      </Box>
                    </HStack>
                    <HStack alignItems={"flex-start"} gap={4}>
                      <Checkbox />
                      <Text color={"whiteAlpha.400"}>
                        Les clients verront un avertissement, mais pourront
                        finaliser les ventes meme lorsque le stock disponible
                        atteindra zéro et en dessous.
                      </Text>
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
          <ProductContainer
            title={"Variation"}
            tooltip={"Saisir les informations de variation du produit"}
          >
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                productDesc: "",
              }}
              onSubmit={() => {}}
              validationSchema={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={5} gap={4} width="full">
                    <HStack
                      width={"full"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <FormTextInput
                        name="ctx"
                        label="Variation"
                        placeholder="0"
                      />
                      <FormTextInput
                        name="ctx"
                        label="Variation"
                        placeholder="0"
                      />
                    </HStack>
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
        </VStack>
        <VStack
          alignItems={"flex-start"}
          gap={8}
          width={{ base: "100%", md: "1/3" }}
        >
          <ProductContainer
            title={"Categories"}
            tooltip={"Saisir les informations de categorie du produit"}
          >
            <Formik
              enableReinitialize
              initialValues={{
                productCategory: "",
              }}
              onSubmit={() => {}}
              validationSchema={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={5} width="full">
                    <FormTextInput
                      name="productCategory"
                      label="Categorie"
                      placeholder="0"
                    />
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
          <ProductContainer
            title={"Status"}
            tooltip={"Saisir les informations de status du produit"}
            withBadge
            badgeValue={"PUBLISH"}
          >
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                productDesc: "",
              }}
              onSubmit={() => {}}
              validationSchema={() => {}}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <VStack mt={5} width="full">
                    <FormTextInput
                      name="ctx"
                      label="Categorie"
                      placeholder="0"
                    />
                  </VStack>
                </Form>
              )}
            </Formik>
          </ProductContainer>
        </VStack>
      </Flex>
    </Box>
  );
};

export default AddProductPage;
