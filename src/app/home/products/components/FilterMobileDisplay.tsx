import { HStack, IconButton } from "@chakra-ui/react";
import { IMobileSidebar } from "_/app/layout-container/sidebar/types";
import { BaseButton } from "_/components/custom/button";
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
} from "_/components/ui/drawer";
import React, { FC, ReactNode } from "react";
import { IoIosCloseCircle } from "react-icons/io";

interface CustmProps extends IMobileSidebar {
  children: ReactNode;
  handleSubmit: () => void;
}

const FilterMobileDisplay: FC<CustmProps> = ({
  isOpen,
  onClose,
  children,
  handleSubmit,
}) => {
  return (
    <DrawerRoot
      open={isOpen}
      onOpenChange={(e) => onClose(e.open)}
      size={"xs"}
      placement={"end"}
      closeOnEscape
    >
      <DrawerBackdrop />
      <DrawerContent height={"full"} pos={"absolute"}>
        <DrawerHeader>
          <HStack p={5} justifyContent={"space-between"}>
            <DrawerTitle>Filtres</DrawerTitle>
            <DrawerActionTrigger asChild>
              <IconButton
                aria-label="close-drawer"
                bgColor={"gray.500"}
                color={"white"}
                onClick={() => onClose(false)}
              >
                <IoIosCloseCircle />
              </IconButton>
            </DrawerActionTrigger>
          </HStack>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
        <DrawerFooter
          display={"flex"}
          flexDir={"column"}
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
          width={"full"}
          p={5}
        >
          <BaseButton
            onClick={handleSubmit}
            withGradient
            colorType={"success"}
            width={"full"}
          >
            Appilquer les filtres
          </BaseButton>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default FilterMobileDisplay;
