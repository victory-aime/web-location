import React from 'react'
import { DrawerActionTrigger, DrawerBackdrop, DrawerBody, DrawerFooter, DrawerContent, DrawerHeader, DrawerRoot, DrawerTitle } from '_components/ui/drawer'
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react'
import { IoIosCloseCircle } from 'react-icons/io'
import { SwitchColorMode, BaseButton } from '_components/custom'
import { UsersModule } from 'bvg-innovation-state-management'
import { adminMenu } from '../route/routes'
import { IMobileSidebar } from '../types'
import { TYPES } from 'bvg-innovation-shared'
import { useQueryClient } from '@tanstack/react-query'
import { RenderLinks } from './RenderLinks'

export const MobileSidebar = ({ isOpen, onClose, handleLogout }: IMobileSidebar) => {
  const queryClient = useQueryClient()
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])

  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} placement={'start'} size={'xs'} closeOnEscape>
      <DrawerBackdrop />
      <DrawerContent height={'full'} bgColor={'#06524c'}>
        <DrawerHeader>
          <HStack p={5} justifyContent={'space-between'}>
            <DrawerTitle>{cachedUser?.store?.name ?? ''}</DrawerTitle>
            <DrawerActionTrigger asChild>
              <IconButton aria-label="close-drawer" boxSize={'35px'} bgColor={'primary.500'} color={'white'} onClick={onClose}>
                <IoIosCloseCircle />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody width={'full'} height={'full'}>
          <VStack alignItems={'flex-start'} width={'full'} align="stretch" height="80%" overflow="auto">
            <RenderLinks links={adminMenu} sideToggled={isOpen} onShowSidebar={onClose} />
          </VStack>
        </DrawerBody>
        <DrawerFooter display={'flex'} flexDir={'column'} alignItems={'flex-start'} justifyContent={'flex-start'} width={'full'} p={5}>
          <Box mb={8}>
            <SwitchColorMode />
          </Box>
          <BaseButton
            onClick={() => {
              handleLogout?.()
              onClose(!isOpen)
            }}
            withGradient
            colorType={'danger'}
            width={'full'}
          >
            Deconnexion
          </BaseButton>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  )
}
