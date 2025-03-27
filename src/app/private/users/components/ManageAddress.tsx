import { Box, HStack, VStack, Separator, For } from "@chakra-ui/react";
import { BaseText, TextVariant } from "_/components/custom/base-text";
import { BaseButton } from "_/components/custom/button";
import BoxContainer from "_/components/custom/container/BoxContainer";
import { ModalComponent } from "_/components/custom/modal";
import NoDataFound from "_/components/custom/no-data-found/NoDataFound";
import { UsersModule } from "_/store/src/modules";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { TYPES } from "_store/src";
import { Formik, FormikValues } from "formik";
import { FormTextInput } from "_/components/custom/form";
import { isEmpty } from "lodash";
import { useSession } from "next-auth/react";

const ManageAddress = () => {
  const dispatch = useDispatch();
  const { user, isLoading, addressAction } = useSelector(
    UsersModule.selectors.userSelector
  );
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedAddress, setSelectedAddress] =
    useState<TYPES.MODELS.USERS.shippingAddress>();
  const [initialValues, setInitialValues] =
    useState<TYPES.VALIDATION_SCHEMA.USERS_SCHEMA.userInitialValues>({
      city: "",
      country: "",
      street: "",
    });
  const submitValues = (values: FormikValues) => {
    const request: TYPES.MODELS.USERS.shippingAddress = {
      ...values,
      id: values?.id,
      userId: session?.keycloakId,
    };
    if (selectedAddress?.id) {
      dispatch(
        UsersModule.actions.editNewShippingAddressRequestAction(request)
      );
    } else {
      dispatch(
        UsersModule.actions.createNewShippingAddressRequestAction(request)
      );
    }
  };

  useEffect(() => {
    if (addressAction) {
      dispatch(UsersModule.actions.clearUserStoreRequestAction());
      setOpen(false);
    }
  }, [addressAction]);

  useEffect(() => {
    if (isEmpty(user)) {
      dispatch(
        UsersModule.actions.userInfoRequestAction({
          userId: session?.keycloakId ?? "",
        })
      );
    }
  }, [user]);

  console.log("values", initialValues);

  return (
    <BoxContainer
      border={"none"}
      p={{ base: 5, md: 10 }}
      title={"Gerer mes addresse"}
      description={"Gerer mes addresse description"}
      buttonTitle={
        user?.shippingAddress?.length !== 3 ? "Nouvelle addresse" : ""
      }
      onClick={() => setOpen(true)}
    >
      <Box gap={5} mt={5} width={"full"}>
        {user?.shippingAddress?.length === 0 ? (
          <NoDataFound />
        ) : (
          <For each={user?.shippingAddress}>
            {(item, index) => (
              <Box key={index} width={"full"}>
                <HStack width={"full"} flexDir={{ base: "column", md: "row" }}>
                  <VStack gap={3} width={"full"} alignItems={"flex-start"}>
                    <BaseText variant={TextVariant.H3}>
                      {item?.country}
                    </BaseText>
                    <BaseText variant={TextVariant.S}>{item?.street}</BaseText>
                    <BaseText variant={TextVariant.M}>{item?.city}</BaseText>
                  </VStack>
                  <VStack
                    width={"full"}
                    alignItems={{ base: "center", md: "flex-end" }}
                    justifyContent={{ base: "center", md: "flex-end" }}
                    flexDir={{ base: "row", md: "column" }}
                  >
                    <BaseButton
                      bg={"gray"}
                      onClick={() => {
                        setOpen(true);
                        setSelectedAddress(item);
                        setInitialValues({
                          id: item?.id,
                          city: item?.city ?? "",
                          country: item?.country ?? "",
                          street: item?.street ?? "",
                        });
                      }}
                    >
                      edit
                    </BaseButton>
                    <BaseButton colorType={"danger"}>Delete</BaseButton>
                  </VStack>
                </HStack>
                <Separator mt={3} mb={3} />
              </Box>
            )}
          </For>
        )}
      </Box>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={submitValues}
      >
        {({ handleSubmit, values }) => (
          <ModalComponent
            title={
              !selectedAddress?.id
                ? "Ajouter une addresse"
                : "Modifier cette addresse"
            }
            open={open}
            onChange={() => setOpen(false)}
            buttonSaveTitle={!selectedAddress?.id ? "Ajouter" : "Modifier"}
            isLoading={isLoading}
            ignoreFooter={false}
            onClick={handleSubmit}
          >
            <VStack>
              <FormTextInput name={"country"} value={values?.country} />
              <FormTextInput name={"city"} value={values?.city} />
              <FormTextInput name={"street"} value={values?.street} />
            </VStack>
          </ModalComponent>
        )}
      </Formik>
    </BoxContainer>
  );
};

export default ManageAddress;
