"use client";

import {
  Box,
  Flex,
  Heading,
  VStack,
  useFileUpload,
  useFileUploadContext,
} from "@chakra-ui/react";
import { BaseButton } from "_/components/custom/button";
import React from "react";
import { GiCancel } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FormTextInput, FormTextArea } from "_/components/custom/form";
import { Formik, Form } from "formik";
import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "_/components/ui/file-upload";
import MyFileUpload from "_/components/custom/drag-drop/MyUpload";

const AddProductPage = () => {
  const router = useRouter();

  return (
    <Box w={"full"} mt={"30px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", md: "row" }}
        overflowX={"auto"}
        gap={4}
      >
        <Heading>Ajouter un produit</Heading>
        <Flex gap={3}>
          <BaseButton
            px={"15px"}
            colorType={"danger"}
            leftIcon={<GiCancel />}
            onClick={() => {
              router.back();
            }}
          >
            annuler
          </BaseButton>
          <BaseButton px={"15px"} colorType={"success"} leftIcon={<FaPlus />}>
            Ajouter
          </BaseButton>
        </Flex>
      </Flex>
      <Flex
        alignItems={"center"}
        justifyContent={"flex-start"}
        flexDirection={{ base: "column", md: "row" }}
        overflowX={"auto"}
        mt={"50px"}
        gap={4}
      >
        <Box
          display={"flex"}
          flexDir={{ base: "column", md: "column" }}
          alignItems={"flex-start"}
          gap={8}
          width={"full"}
          p={3}
        >
          <Box
            p={"24px"}
            borderRadius={"7px"}
            w={"full"}
            border={"1px solid"}
            borderColor={"whiteAlpha.400"}
          >
            <Heading>General Info</Heading>
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
                  <VStack mt={10} gap={4} align="stretch" width="100%">
                    <FormTextInput name="name" label="Nom" placeholder="john" />
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
          </Box>

          <MyFileUpload />
        </Box>
        <Box width={{ base: "100%", md: "1/3" }} bgColor={"yellow"}>
          rightContainer
        </Box>
      </Flex>
    </Box>
  );
};

export default AddProductPage;
