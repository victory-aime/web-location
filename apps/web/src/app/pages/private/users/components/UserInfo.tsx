import { Box, Flex, VStack, Separator } from '@chakra-ui/react'
import { keycloakSessionLogOut } from '_hooks/logout'
import { BaseButton, BaseText, TextVariant } from '_components/custom'
import { Avatar } from '_components/ui/avatar'
import { hexToRGB } from '_theme/colors'
import { signOut, useSession } from 'next-auth/react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { HiOutlineUser } from 'react-icons/hi2'
import { IoIosCog } from 'react-icons/io'
import { BsCart, BsHeart } from 'react-icons/bs'
import { UsersModule } from 'bvg-innovation-state-management'
import { useQueryClient } from '@tanstack/react-query'
import { TYPES } from 'bvg-innovation-shared'

interface Props {
  currentStep: number | string | null
  onChangeStep: Dispatch<SetStateAction<number>>
}

const UserInfo = ({ currentStep, onChangeStep }: Props) => {
  const { status } = useSession()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])
  const renderStepMap = [
    {
      icon: <HiOutlineUser />,
      title: 'Informations personnelles',
    },
    {
      icon: <BsCart />,
      title: 'Mes commandes',
    },
    {
      icon: <BsHeart />,
      title: 'My Wishlist',
    },
    {
      icon: <IoIosCog />,
      title: 'Parametres',
    },
  ]

  return (
    <Box
      width={{ base: 'full', lg: '1/3' }}
      borderRadius={'7px'}
      height={{ base: 'fit-content', lg: '500px' }}
      boxShadow={'lg'}
    >
      <Box
        pl={'10px'}
        pr={'10px'}
        mt={'30px'}
        mb={'30px'}
        display={'flex'}
        flexDir={'row'}
        alignItems={'center'}
        gap={2}
      >
        <Avatar size={'xl'} name={cachedUser?.name} />
        <Box>
          <BaseText>Bonjour,👋</BaseText>
          <BaseText variant={TextVariant.S}>{cachedUser?.name} </BaseText>
        </Box>
      </Box>
      <Separator mt={4} mb={4} />
      <VStack alignItems={'flex-start'} pl={'10px'} pr={'10px'} mt={'30px'} mb={'30px'}>
        {renderStepMap?.map((item, index) => (
          <Flex
            key={index}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            borderRadius={currentStep === index ? '7px' : ''}
            onClick={() => {
              onChangeStep(index)
            }}
            bgColor={currentStep === index ? hexToRGB('blue', 0.5) : ''}
            p={'10px'}
            _hover={{
              background: hexToRGB('blue', 0.1),
              borderRadius: '7px',
              cursor: 'pointer',
            }}
            gap={'20px'}
          >
            {item.icon}
            <BaseText>{item.title}</BaseText>
          </Flex>
        ))}

        {status === 'authenticated' && (
          <BaseButton
            mt={'30px'}
            onClick={() => {
              keycloakSessionLogOut().then(() => {
                signOut().then(() => {
                  setLoading(false)
                })
              })
              setLoading(true)
            }}
            width={'full'}
            colorType={'danger'}
            isLoading={loading}
            withGradient
          >
            Deconnexion
          </BaseButton>
        )}
      </VStack>
    </Box>
  )
}

export default UserInfo
