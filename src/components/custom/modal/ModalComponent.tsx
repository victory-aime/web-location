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
import React from "react";
import { BaseButton } from "../button";
import { variantColorType } from "../button/interface/button";
import { ModalProps } from "./interface/modal";

const ModalComponent = ({
  isOpen = false,
  ignoreFooter = true,
  onChange,
  title = "Modal Title",
  colorSaveButton = "success",
  buttonSaveTitle = "Save",
  isLoading,
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
        {!ignoreFooter ? (
          <DialogFooter mt={8}>
            <DialogActionTrigger asChild>
              <BaseButton onClick={onChange} variant="outline">
                Cancel
              </BaseButton>
            </DialogActionTrigger>
            <BaseButton
              withGradient
              onClick={() => onClick && onClick()}
              isLoading={isLoading}
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
