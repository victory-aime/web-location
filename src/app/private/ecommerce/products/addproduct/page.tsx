"use client";

import {
  Box,
  Flex,
  Heading,
  Separator,
  VStack,
  Text,
  Stack,
  createListCollection,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react";
import { ActionsButton, BaseButton } from "_components/custom/button";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FormTextInput,
  FormTextArea,
  FormSelect,
} from "_components/custom/form";
import { FieldArray, Formik } from "formik";
import { CustomDragDropZone } from "_components/custom/drag-drop/";
import { LuBadgeDollarSign } from "react-icons/lu";
import { ProductContainer } from "../components";
import { APP_ROUTES } from "_/app/config/routes";
import { useDispatch } from "react-redux";
import { AuthModule, ProductModule } from "_store/src/modules";
import { useSelector } from "react-redux";
import ProtectedRoute from "_/app/layout/protected/ProtectedRoute";
import { TYPES, UTILS } from "_store/src";
import { GiCancel } from "react-icons/gi";
import { ProfitCalculator } from "_/app/hooks/profit-calculator";

const AddProductPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const requestId = useSearchParams()?.get("requestId");
  const responsiveMode = useBreakpointValue({ base: false, md: true });
  const [initialValues, setInitialValues] = useState(
    TYPES.VALIDATION_SCHEMA.PRODUCTS_SCHEMA.initialProductValues,
  );
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const { addProduct, products, isLoading, categories, updateProduct } =
    useSelector(ProductModule.selectors.productSelector);
  const [images, setImages] = useState<string[]>([]);
  const [getProductImages, setGetProductImages] = useState<string[]>([]);
  const [filesUploaded, setFilesUploaded] = useState<File[]>([]);

  const existingProductFiles = UTILS.findDynamicIdInList(
    requestId ?? "",
    products,
  );

  const fetchBase64Images = async () => {
    if (filesUploaded?.length > 0) {
      const base64Images = await Promise.all(
        filesUploaded?.map((file) => UTILS.fileToBase64(file)),
      );
      setImages(base64Images);
    }
  };

  const submitForm = (values: TYPES.MODELS.PRODUCTS.ICreateProduct) => {
    const requestData: TYPES.MODELS.PRODUCTS.ICreateProduct = {
      name: values?.name,
      description: values?.description,
      price: values?.price,
      stock: values?.stock,
      articlePrice: parseFloat(`${values?.articlePrice}`),
      profit: parseFloat(`${values?.profit}`),
      profitMargin: parseFloat(`${values?.profitMargin}`),
      categoryName: values?.categoryName && values?.categoryName[0],
      variants:
        values?.variants &&
        values?.variants?.map((variant: any) => ({
          name: variant.name,
          variantValue: variant.value,
        })),
      status: values?.status && values?.status[0],
      images,
      storeId: currentUser?.store?.id ?? "",
    };
    if (requestId) {
      dispatch(
        ProductModule.actions.updateProduct({
          id: requestId,
          ...requestData,
        }),
      );
    } else {
      dispatch(ProductModule.actions.createProduct(requestData));
    }
  };

  useEffect(() => {
    if (addProduct || updateProduct) {
      dispatch(ProductModule.actions.clearStateKeysAction());
      router.push(APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST);
    }
    if (filesUploaded?.length > 0) {
      fetchBase64Images();
    }
  }, [addProduct, router, filesUploaded?.length, updateProduct]);

  useEffect(() => {
    if (requestId && existingProductFiles) {
      setGetProductImages(existingProductFiles?.product?.images);
      setInitialValues({
        ...existingProductFiles,
        name: existingProductFiles?.product?.name,
        variants: existingProductFiles?.product?.variants?.map(
          (item: { name: string; variantValue: string }) => ({
            name: item?.name,
            value: item?.variantValue,
          }),
        ),
        categoryName: [existingProductFiles?.categoryName],
        status: [existingProductFiles.status],
      });
    }
    if (categories?.length === 0) {
      dispatch(ProductModule.actions.getCategoriesList());
    }
  }, [categories?.length, requestId, existingProductFiles]);

  const categoryList = createListCollection({
    items:
      categories?.map((item) => ({
        label: item.name,
        value: item.name,
      })) || [],
  });

  return (
    <ProtectedRoute>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitForm}
      >
        {({ values, setFieldValue, handleSubmit }) => (
          <Box w={"full"} mt={"30px"}>
            <Flex
              alignItems={"center"}
              justifyContent={"space-between"}
              flexDirection={{ base: "column", md: "row" }}
              gap={4}
            >
              <Stack gap={2}>
                <Heading>
                  {!requestId ? "Ajouter un produit" : "Modifier votre produit"}
                </Heading>
                <Text color={"gray.400"}>
                  Saisissez toutes les informations relatives a l'ajout de votre
                  produit
                </Text>
              </Stack>

              {responsiveMode ? (
                <ActionsButton
                  cancelTitle={"annuler"}
                  goBackUrl={APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST}
                  validateTitle={requestId ? "Valider" : "Ajouter"}
                  requestId={requestId ?? ""}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                />
              ) : null}
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
                  <VStack mt={10} gap={4} align="stretch" width="100%">
                    <FormTextInput
                      name="name"
                      value={values?.name}
                      label="Nom du produit"
                      placeholder="Nom du produit"
                    />
                    <FormTextArea
                      name={"description"}
                      label={"Description"}
                      value={values?.description}
                      placeholder={"Saisissez la description du produit ici..."}
                      onChangeFunction={(e: any) =>
                        setFieldValue("description", e.target.value)
                      }
                    />
                  </VStack>
                </ProductContainer>
                <ProductContainer
                  title={"Images"}
                  tooltip={"Ajouter des images du produit"}
                >
                  <CustomDragDropZone
                    getFilesUploaded={setFilesUploaded}
                    base64Images={getProductImages}
                  />
                </ProductContainer>
                <ProductContainer
                  title={"Tariification"}
                  tooltip={"Saisir les informations de tarification du produit"}
                >
                  <VStack mt={10} gap={4} align="stretch" width="100%">
                    <Stack
                      width={"full"}
                      gap={4}
                      direction={{ base: "column", md: "row" }}
                    >
                      <FormTextInput
                        name="price"
                        type={"number"}
                        value={values?.price}
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Prix initial"
                        placeholder="Type base price here. . ."
                      />
                      <FormTextInput
                        name="stock"
                        label={"Quantité"}
                        type={"number"}
                        value={values?.stock}
                        placeholder="0"
                      />
                    </Stack>
                    <Separator />
                    <Stack gap={4} direction={{ base: "column", md: "row" }}>
                      <FormTextInput
                        name="articlePrice"
                        type={"number"}
                        value={values?.articlePrice}
                        leftAccessory={<LuBadgeDollarSign />}
                        label="Cout par article"
                        placeholder="0,00"
                        toolTipInfo="Le cout par article est le prix que vous payez pour chaque article que vous vendez.Cette information est utilisée pour calculer votre bénéfice et elle ne sera pas visible par les clients."
                      />

                      <FormTextInput
                        name="profit"
                        value={values?.profit}
                        isDisabled
                        label="Profit par article"
                        toolTipInfo="Le profit genere par article."
                        placeholder="0,00"
                      />
                      <FormTextInput
                        name="profitMargin"
                        isDisabled
                        value={values?.profitMargin}
                        label="Marge de profit"
                        placeholder="0,00%"
                        toolTipInfo="La marge de profit generale. determinée en pourcentage"
                      />
                    </Stack>
                  </VStack>
                </ProductContainer>

                <FieldArray name="variants">
                  {({ push, remove }) => (
                    <ProductContainer
                      title={"Variation"}
                      type="button"
                      tooltip={
                        "Les variations vous permettent d'ajouter différentes options pour un même produit, comme la couleur ou la taille. Ajoutez celles qui s'appliquent à votre article"
                      }
                      onClick={() =>
                        push({
                          name: "",
                          value: "",
                        })
                      }
                    >
                      <Box mt={5} width="full">
                        <Text color={"gray.400"} mb={5}>
                          Les variations vous permettent d'ajouter différentes
                          options pour un même produit, comme la couleur ou la
                          taille. Ajoutez celles qui s'appliquent à votre
                          article
                        </Text>
                        {values?.variants &&
                          values?.variants?.length > 0 &&
                          values?.variants?.map((_: any, index: number) => (
                            <Flex
                              width="100%"
                              mt="10px"
                              gap={2}
                              flexDir={{ base: "column", md: "row" }}
                              alignItems={"center"}
                            >
                              <FormTextInput
                                required
                                name={`variants[${index}].name`}
                                value={values?.variants?.[index]?.name}
                                placeholder={"ex: Couleur"}
                                toolTipInfo={"Saisissez le type de variant"}
                              />
                              <FormTextInput
                                required
                                name={`variants[${index}].value`}
                                placeholder={"ex:Noir"}
                                value={values?.variants?.[index]?.value}
                                toolTipInfo={"Mettez la valeur de la variant"}
                              />
                              {values?.variants &&
                                values?.variants.length >= 1 && (
                                  <BaseButton
                                    colorType={"danger"}
                                    withGradient
                                    p={2}
                                    leftIcon={<GiCancel />}
                                    onClick={() => remove(index as number)}
                                  />
                                )}
                            </Flex>
                          ))}
                      </Box>
                    </ProductContainer>
                  )}
                </FieldArray>
              </VStack>
              <VStack
                alignItems={"flex-start"}
                gap={8}
                width={{ base: "100%", md: "1/3" }}
              >
                <ProductContainer
                  title={"Categorie"}
                  tooltip={"Saisir les informations de categorie du produit"}
                >
                  <VStack mt={5} width="full">
                    <FormSelect
                      name="categoryName"
                      setFieldValue={setFieldValue}
                      listItems={categoryList}
                      placeholder="Choisissez une categorie"
                    />
                  </VStack>
                </ProductContainer>
                <ProductContainer
                  title={"Status"}
                  tooltip={
                    "Choisissez le status du produit en fonction du status votre produit sera visible par les client et pourra etre commande"
                  }
                  withBadge
                  badgeValue={values?.status && values?.status[0]}
                >
                  <VStack mt={5} width="full">
                    <FormSelect
                      listItems={TYPES.CONSTANTS.PRODUCTS.productListStatus}
                      setFieldValue={setFieldValue}
                      name="status"
                      placeholder="Choisissez un status"
                    />
                  </VStack>
                </ProductContainer>
              </VStack>
            </Flex>

            {!responsiveMode && (
              <Center>
                <ActionsButton
                  cancelTitle={"annuler"}
                  goBackUrl={APP_ROUTES.PRIVATE.ECOMMERCE.PRODUCTS.LIST}
                  validateTitle={requestId ? "Valider" : "Ajouter"}
                  requestId={requestId ?? ""}
                  isLoading={isLoading}
                  onClick={handleSubmit}
                />
              </Center>
            )}
            <ProfitCalculator />
          </Box>
        )}
      </Formik>
    </ProtectedRoute>
  );
};

export default AddProductPage;
