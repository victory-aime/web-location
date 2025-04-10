import { Box, Stack, VStack } from '@chakra-ui/react';
import { BaseText, TextWeight } from '_components/custom/base-text';
import React, { useEffect, useState } from 'react';
import { BaseButton } from '_components/custom/button';
import { Session } from 'next-auth';
import { useDispatch, useSelector } from 'react-redux';
import { UsersModule } from '_store/src/modules';
import { TYPES } from '_store/src';
import { Formik } from 'formik';
import { FormTextInput } from '_components/custom/form';

const ShippingAddress = ({ Next, session }: { Next: any; session: Session | null }) => {
  const { user } = useSelector(UsersModule.selectors.userSelector);
  const dispatch = useDispatch();
  const [initialUserValues, setInitialUserValues] = useState<TYPES.MODELS.USERS.IUser>(user || {});

  useEffect(() => {
    if (!user?.id && session?.keycloakId) {
      dispatch(
        UsersModule.actions.userInfoRequestAction({
          userId: session.keycloakId,
        })
      );
    }
  }, [session?.keycloakId]);

  useEffect(() => {
    if (user?.id) {
      setInitialUserValues(user);
    }
  }, [user?.id]);

  return (
    <Box>
      <VStack gap={2} alignItems={'flex-start'}>
        <BaseText weight={TextWeight.Bold}>Renseignez votre votre adresse de livraison</BaseText>
      </VStack>
      <Box width={'full'} mt={5}>
        <Formik enableReinitialize initialValues={initialUserValues} onSubmit={() => {}}>
          {({ handleSubmit, values }) => (
            <Box p={{ base: 4, md: 6 }} width={'full'}>
              <VStack alignItems={'flex-start'} gap={6} width={'100%'}>
                <Stack flexDir={{ base: 'column', md: 'row' }} width="full" gap={4}>
                  <FormTextInput
                    required
                    name={'name'}
                    label={'Nom'}
                    placeholder={'Veuillez saisir votre nom'}
                    value={values?.name}
                  />
                  <FormTextInput
                    required
                    name={'firstName'}
                    label={'Prenom'}
                    placeholder={'Veuillez saisir votre prenom'}
                    value={values?.firstName}
                  />
                </Stack>
                <Stack flexDir={{ base: 'column', md: 'row' }} width="full" gap={4}>
                  <FormTextInput
                    required
                    name={'email'}
                    type={'email'}
                    label={'Email'}
                    placeholder={'Veuillez saisir votre addresse email'}
                    value={values?.email}
                  />
                  <FormTextInput
                    required
                    name={'phone'}
                    type={'tel'}
                    label={'Telephone'}
                    placeholder={'Veuillez saisir votre numero de telephone'}
                    value={values?.phone}
                  />
                </Stack>
                <FormTextInput
                  required
                  name={'phone'}
                  type={'tel'}
                  label={'Addresse'}
                  placeholder={'Veuillez saisir votre numero de telephone'}
                  value={values?.address}
                />
              </VStack>
              <Next>
                <BaseButton
                  mt={50}
                  colorType={'secondary'}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Confimer
                </BaseButton>
              </Next>
            </Box>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ShippingAddress;
