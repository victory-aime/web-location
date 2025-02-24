"use client";

import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { BaseButton } from "../base/baseButton";
import { IoSave } from "react-icons/io5";
import { hexToRGB } from "_theme/colors";

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  goBackUrl,
  requestId,
  isLoading = false,
  onClick,
}: {
  cancelTitle?: string;
  validateTitle?: string;
  goBackUrl?: string;
  requestId?: string;
  isLoading?: boolean;
  onClick?: () => void;
}) => {
  if (cancelTitle && !goBackUrl) {
    throw new Error("goBackUrl is missing");
  }
  const router = useRouter();
  return (
    <Flex gap={3}>
      {cancelTitle && (
        <BaseButton
          px={"15px"}
          colorType={"danger"}
          leftIcon={<GiCancel />}
          onClick={() => {
            router.push(goBackUrl ?? "");
          }}
        >
          {cancelTitle}
        </BaseButton>
      )}

      {validateTitle && (
        <BaseButton
          onClick={onClick}
          px={"15px"}
          bg={hexToRGB("primary", 0.5)}
          withGradient
          isLoading={isLoading}
          leftIcon={requestId ? <IoSave /> : <FaPlus />}
        >
          {validateTitle}
        </BaseButton>
      )}
    </Flex>
  );
};
