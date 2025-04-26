import { Box, Flex, VStack, Stack } from '@chakra-ui/react'
import { BaseText, BaseButton, FormTextInput, UploadAvatar } from '_components/custom'
import { TYPES } from 'bvg-innovation-shared'
import { refreshAccessToken } from '_utils/auth'
import { Formik } from 'formik'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { TbEdit } from 'react-icons/tb'
import { CiCircleCheck } from 'react-icons/ci'
import { MdCancel } from 'react-icons/md'
import { UsersModule } from 'bvg-innovation-state-management'
import { useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import { globalApplicationContext } from '_config/globalState'

const Profile = ({ session }: { session: Session | null }) => {
  const queryClient = useQueryClient()
  const { update } = useSession()
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])
  const [enabledEdit, setEnableEdit] = useState(false)
  const [avatar, setAvatar] = useState<string | undefined | null>(null)
  const [initialUserValues, setInitialUserValues] = useState<TYPES.MODELS.USERS.IUser | null>(null)
  const formikRef: any = useRef(null)
  const refreshToken = globalApplicationContext.getRefreshToken()
  const { data: user } = UsersModule.userInfoQueries({
    payload: {
      userId: session?.keycloakId ?? '',
    },
    queryOptions: {
      enabled: Boolean(session?.keycloakId) && !cachedUser,
    },
  })
  const { mutateAsync } = UsersModule.updateUserInfoQueries({
    onSuccess: async () => {
      await refreshAccessToken(refreshToken)
      await update({
        ...session,
        user: {
          email: formikRef.current.values?.email,
        },
      })
      queryClient.invalidateQueries({ queryKey: [UsersModule.constants.WOHAMI] })
      setEnableEdit(false)
    },
  })
  const handleFileUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
    } else {
      setAvatar(undefined)
    }
  }

  useEffect(() => {
    if (cachedUser) {
      setInitialUserValues(cachedUser)
    } else {
      setInitialUserValues(user ?? null)
    }
  }, [cachedUser, user])

  const handleUpdateUser = async (values: any) => {
    await mutateAsync(values)
  }

  return (
    <Formik enableReinitialize initialValues={initialUserValues} onSubmit={handleUpdateUser} innerRef={formikRef}>
      {({ handleSubmit, values, dirty }) => (
        <Box p={{ base: 4, md: 6 }} width={'full'}>
          <Flex
            alignItems={'center'}
            flexDir={{ base: 'column', lg: 'row' }}
            justifyContent={{ base: 'center', lg: 'space-between' }}
            mt={10}
            mb={10}
            gap={5}
          >
            <UploadAvatar getFileUploaded={handleFileUpload} avatarImage={avatar} name={cachedUser?.name} />
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
                <BaseButton withGradient bg={'gray'} leftIcon={<MdCancel />} onClick={() => setEnableEdit(false)}>
                  <BaseText>Annuler</BaseText>
                </BaseButton>
                <BaseButton
                  withGradient
                  colorType={'success'}
                  leftIcon={<CiCircleCheck />}
                  disabled={!dirty}
                  onClick={() => {
                    handleSubmit()
                    setEnableEdit(false)
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
  )
}

export default Profile
