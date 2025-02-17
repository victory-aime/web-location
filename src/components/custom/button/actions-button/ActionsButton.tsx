"use client";

import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { BaseButton } from "../base/baseButton";

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  goBackUrl,
  onClick,
}: {
  cancelTitle?: string;
  validateTitle?: string;
  goBackUrl?: string;
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
          colorType={"success"}
          leftIcon={<FaPlus />}
        >
          {validateTitle}
        </BaseButton>
      )}
    </Flex>
  );
};
