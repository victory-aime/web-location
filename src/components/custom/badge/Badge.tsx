import { Badge, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";
import { Props } from "./interface/badge";
import { HiStar } from "react-icons/hi";
import { GiCancel } from "react-icons/gi";
import { MdOutlineDoneAll } from "react-icons/md";
import { TbProgress } from "react-icons/tb";
import { hexToRGB } from "_/theme/colors";

export const CustomBadge: FC<Props> = ({
  children,
  status = "NEW",
  variant = "solid",
  ...props
}) => {
  return (
    <Badge
      {...props}
      variant={variant}
      size={"lg"}
      borderRadius={"7px"}
      p={2}
      color={"white"}
      bgColor={
        status === "DONE"
          ? "primary.500"
          : status === "IN_PROGRESS"
            ? "blue.500"
            : status === "REJECTED"
              ? "red.500"
              : "gray.500"
      }
    >
      <HStack gap={1}>
        {status === "DONE" ? (
          <MdOutlineDoneAll />
        ) : status === "IN_PROGRESS" ? (
          <TbProgress />
        ) : status === "REJECTED" ? (
          <GiCancel />
        ) : (
          <HiStar />
        )}
        <Text textTransform={"capitalize"}>
          {status === "DONE"
            ? "Livré"
            : status === "IN_PROGRESS"
              ? "en cours"
              : status === "REJECTED"
                ? " Annulée"
                : "Nouvelle"}
        </Text>
      </HStack>
    </Badge>
  );
};
