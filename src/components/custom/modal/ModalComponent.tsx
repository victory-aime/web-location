import { DialogRootProps } from "@chakra-ui/react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "_/components/ui/dialog";
import React, { ReactNode } from "react";
import { BaseButton } from "../button";
import { variantColorType } from "../button/interface/button";

interface ModalProps extends DialogRootProps {
  title?: string | undefined;
  isOpen?: boolean | undefined;
  onChange: (value: any) => void;
  ignoreFooter?: boolean;
  modalType?: "dialog" | "alertdialog" | undefined;
  buttonSaveTitle?: string;
  colorSaveButton?: variantColorType;
  isFull?: boolean | undefined;
  onClick?: () => void;
  children: ReactNode;
}

const ModalComponent = ({
  isOpen = false,
  ignoreFooter = true,
  onChange,
  title = "Modal Title",
  colorSaveButton = "success",
  buttonSaveTitle = "Save",
  onClick,
  isFull,
  modalType,
  children,
  ...rest
}: ModalProps) => {
  return (
    <DialogRoot
      open={isOpen}
      lazyMount
      onOpenChange={(e) => onChange(e?.open)}
      placement={"center"}
      role={modalType}
      size={isFull ? "full" : "lg"}
      motionPreset="slide-in-top"
      {...rest}
    >
      <DialogContent width={"full"} padding={8}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody mt={8}>{children}</DialogBody>
        {ignoreFooter ? (
          <DialogFooter mt={8}>
            <DialogActionTrigger asChild>
              <BaseButton onClick={onChange} variant="outline">
                Cancel
              </BaseButton>
            </DialogActionTrigger>
            <BaseButton
              withGradient
              onClick={() => onClick && onClick()}
              colorType={
                modalType === "alertdialog"
                  ? "danger"
                  : (colorSaveButton as variantColorType)
              }
            >
              {buttonSaveTitle}
            </BaseButton>
          </DialogFooter>
        ) : null}
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalComponent;
