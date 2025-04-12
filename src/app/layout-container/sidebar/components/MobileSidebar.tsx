import React from 'react';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerFooter,
  DrawerContent,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '_components/ui/drawer';
import { Box, HStack, IconButton, VStack } from '@chakra-ui/react';
import { BaseButton } from '_/components/custom/button';
import { IoIosCloseCircle } from 'react-icons/io';
import { adminMenu } from '../sideBarRoutes';
import RenderLinks from './RenderLinks';
import { IMobileSidebar } from '../types';
import SwitchColorMode from '_components/custom/switch-color/SwitchColorMode';
import { useSelector } from 'react-redux';
import { UsersModule } from '_/store/src/modules';

const MobileSidebar = ({ isOpen, onClose, handleLogout }: IMobileSidebar) => {
  const { user } = useSelector(UsersModule.selectors.userSelector);
  return (
    <DrawerRoot open={isOpen} onOpenChange={onClose} placement={'start'} size={'xs'} closeOnEscape>
      <DrawerBackdrop />
      <DrawerContent height={'full'}>
        <DrawerHeader>
          <HStack p={5} justifyContent={'space-between'}>
            <DrawerTitle>{user?.store?.name ?? ''}</DrawerTitle>
            <DrawerActionTrigger asChild>
              <IconButton
                aria-label="close-drawer"
                boxSize={'35px'}
                bgColor={'primary.500'}
                color={'white'}
                onClick={onClose}
              >
                <IoIosCloseCircle />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody width={'full'} height={'full'}>
          <VStack
            alignItems={'flex-start'}
            width={'full'}
            align="stretch"
            height="80%"
            overflow="auto"
          >
            <RenderLinks links={adminMenu} sideToggled={isOpen} onShowSidebar={onClose} />
          </VStack>
        </DrawerBody>
        <DrawerFooter
          display={'flex'}
          flexDir={'column'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          width={'full'}
          p={5}
        >
          <Box mb={8}>
            <SwitchColorMode />
          </Box>
          <BaseButton
            onClick={() => {
              handleLogout?.();
              onClose(!isOpen);
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
  );
};

export default MobileSidebar;
