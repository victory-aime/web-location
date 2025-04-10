import { Box, Flex, VStack, Stack } from '@chakra-ui/react';
import { BaseText, TextVariant } from '_/components/custom/base-text';
import { BaseButton } from '_/components/custom/button';
import { UploadAvatar } from '_/components/custom/drag-drop';
import { FormTextInput } from '_/components/custom/form';
import { AuthModule, UsersModule } from '_/store/src/modules';
import { refreshAccessToken } from '_/utils/auth/refresh-token';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { TbEdit } from 'react-icons/tb';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Profile = ({ session }: any) => {
  const { status, update } = useSession();
  const { user } = useSelector(UsersModule.selectors.userSelector);
  const dispatch = useDispatch();
  const { refresh_token } = useSelector(AuthModule.selectors.authSelector);
  const [enabledEdit, setEnableEdit] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined | null>(null);
  const [initialUserValues, setInitialUserValues] = useState<any | null>(user);

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

  useEffect(() => {
    if (isEmpty(user) && session?.keycloakId && status === 'authenticated') {
      dispatch(
        UsersModule.actions.userInfoRequestAction({
          userId: session?.keycloakId ?? '',
        })
      );
    }
  }, [status, user, session]);

  useEffect(() => {
    if (!isEmpty(user)) {
      setInitialUserValues(user);
    }
  }, [user]);

  const handleUpdateUser = async (values: any) => {
    dispatch(UsersModule.actions.updateUserRequestInfo(values));
    await refreshAccessToken(refresh_token);
    await update({
      ...session,
      user: {
        email: values?.email,
      },
    });
    setEnableEdit(false);
  };

  return (
    <Formik enableReinitialize initialValues={initialUserValues} onSubmit={handleUpdateUser}>
      {({ handleSubmit, values }) => (
        <Box p={{ base: 4, md: 6 }} width={'full'}>
          <BaseText variant={TextVariant.M}>Informations personnelles</BaseText>
          <Flex
            alignItems={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
            justifyContent={{ base: 'center', lg: 'space-between' }}
            mt={10}
            mb={10}
            gap={5}
          >
            <UploadAvatar
              getFileUploaded={handleFileUpload}
              avatarImage={avatar}
              name={user?.name}
            />
            {!enabledEdit ? (
              <BaseButton
                withGradient
                colorType={'secondary'}
                leftIcon={<TbEdit />}
                onClick={() => setEnableEdit(true)}
              >
                <BaseText>Modifier</BaseText>
              </BaseButton>
            ) : (
              <Flex gap={3}>
                <BaseButton
                  withGradient
                  bg={'gray'}
                  leftIcon={<TbEdit />}
                  onClick={() => setEnableEdit(false)}
                >
                  <BaseText>Annuler</BaseText>
                </BaseButton>
                <BaseButton
                  withGradient
                  colorType={'success'}
                  leftIcon={<TbEdit />}
                  onClick={() => {
                    handleSubmit();
                    setEnableEdit(true);
                  }}
                >
                  <BaseText>Valider</BaseText>
                </BaseButton>
              </Flex>
            )}
          </Flex>

          <VStack alignItems={'flex-start'} gap={6} mt={10} width={'100%'}>
            <Stack flexDir={{ base: 'column', md: 'row' }} width="full" gap={4}>
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={'name'}
                label={'Nom'}
                placeholder={'Veuillez saisir votre nom'}
                value={values?.name}
              />
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={'firstName'}
                label={'Prenom'}
                placeholder={'Veuillez saisir votre prenom'}
                value={values?.firstName}
              />
            </Stack>
            <Stack flexDir={{ base: 'column', md: 'row' }} width="full" gap={4}>
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={'email'}
                type={'email'}
                label={'Email'}
                placeholder={'Veuillez saisir votre addresse email'}
                value={values?.email}
              />
              <FormTextInput
                required
                isDisabled={!enabledEdit}
                name={'phone'}
                type={'tel'}
                label={'Telephone'}
                placeholder={'Veuillez saisir votre numero de telephone'}
                value={values?.phone}
              />
            </Stack>
          </VStack>
        </Box>
      )}
    </Formik>
  );
};

export default Profile;
