import { HStack, IconButton } from '@chakra-ui/react';
import { ModalOpenProps } from '_components/custom';
import { BaseButton } from '_components/custom';
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from '_components/ui/drawer';
import React, { FC, ReactNode } from 'react';
import { IoIosCloseCircle } from 'react-icons/io';

interface CustomProps extends ModalOpenProps {
  children: ReactNode;
  handleSubmit: () => void;
}

const FilterMobileDisplay: FC<CustomProps> = ({ isOpen, onChange, children, handleSubmit }) => {
  return (
    <DrawerRoot
      open={isOpen}
      onOpenChange={(e) => onChange(e.open)}
      size={'xs'}
      placement={'end'}
      closeOnEscape
    >
      <DrawerBackdrop />
      <DrawerContent height={'full'} pos={'absolute'}>
        <DrawerHeader>
          <HStack p={5} justifyContent={'space-between'}>
            <DrawerTitle>Filtres</DrawerTitle>
            <DrawerActionTrigger asChild>
              <IconButton
                aria-label="close-drawer"
                bgColor={'gray.500'}
                color={'white'}
                onClick={() => onChange(false)}
              >
                <IoIosCloseCircle />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter
          display={'flex'}
          flexDir={'column'}
          alignItems={'flex-start'}
          justifyContent={'flex-start'}
          width={'full'}
          p={5}
        >
          <BaseButton onClick={handleSubmit} withGradient colorType={'success'} width={'full'}>
            Appilquer les filtres
          </BaseButton>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default FilterMobileDisplay;
