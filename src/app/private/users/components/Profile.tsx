import { Box, Flex, VStack, Stack } from "@chakra-ui/react";
import { BaseText, TextVariant } from "_/components/custom/base-text";
import { BaseButton } from "_/components/custom/button";
import { UploadAvatar } from "_/components/custom/drag-drop";
import { FormTextInput } from "_/components/custom/form";
import { AuthModule } from "_/store/src/modules";
import { Formik } from "formik";
import React, { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector(AuthModule.selectors.authSelector);
  const [enabledEdit, setEnableEdit] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined | null>(null);

  const handleFileUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
    } else {
      setAvatar(undefined);
    }
  };

  return (
    <Box p={{ base: 4, md: 6 }} width={"full"}>
      <BaseText variant={TextVariant.M}>Informations personnelles</BaseText>
      <Flex
        alignItems={"center"}
        flexDir={{ base: "column", lg: "row" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        mt={10}
        mb={10}
        gap={5}
      >
        <UploadAvatar
          getFileUploaded={handleFileUpload}
          avatarImage={avatar}
          name={currentUser?.name}
        />
        {!enabledEdit ? (
          <BaseButton
            withGradient
            colorType={"secondary"}
            leftIcon={<TbEdit />}
            onClick={() => setEnableEdit(true)}
          >
            <BaseText>Modifier</BaseText>
          </BaseButton>
        ) : (
          <Flex gap={3}>
            <BaseButton
              withGradient
              bg={"gray"}
              leftIcon={<TbEdit />}
              onClick={() => setEnableEdit(false)}
            >
              <BaseText>Annuler</BaseText>
            </BaseButton>
            <BaseButton
              withGradient
              colorType={"success"}
              leftIcon={<TbEdit />}
              onClick={() => setEnableEdit(true)}
            >
              <BaseText>Valider</BaseText>
            </BaseButton>
          </Flex>
        )}
      </Flex>
      <Formik
        enableReinitialize
        initialValues={{
          name: currentUser?.name,
          firstName: currentUser?.firstName,
          email: currentUser?.email,
          phone: currentUser?.phone,
        }}
        onSubmit={() => {
          console.log("submit");
        }}
      >
        {({ handleSubmit, values }) => (
          <VStack alignItems={"flex-start"} gap={6} mt={10} width={"100%"}>
            <Stack flexDir={{ base: "column", md: "row" }} width="full" gap={4}>
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={"name"}
                label={"Nom"}
                placeholder={"Veuillez saisir votre nom"}
                value={values.name}
              />
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={"firstName"}
                label={"Prenom"}
                placeholder={"Veuillez saisir votre prenom"}
                value={values.firstName}
              />
            </Stack>
            <Stack flexDir={{ base: "column", md: "row" }} width="full" gap={4}>
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={"email"}
                type={"email"}
                label={"Email"}
                placeholder={"Veuillez saisir votre addresse email"}
                value={values.email}
              />
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={"phone"}
                type={"tel"}
                label={"Telephone"}
                placeholder={"Veuillez saisir votre numero de telephone"}
                value={values.phone}
              />
            </Stack>
          </VStack>
        )}
      </Formik>
    </Box>
  );
};

export default Profile;
