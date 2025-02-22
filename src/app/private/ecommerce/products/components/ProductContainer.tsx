import { Flex, Heading } from "@chakra-ui/react";
import { CustomBadge } from "_/components/custom/badge";
import { Status } from "_/components/custom/badge/interface/badge";
import { BaseButton } from "_/components/custom/button";
import BoxContainer from "_/components/custom/container/BoxContainer";
import { InfoTip } from "_/components/ui/toggle-tip";
import React from "react";

export const ProductContainer = ({
  children,
  title,
  tooltip,
  withBadge = false,
  type = "badge",
  onClick,
  badgeValue = "DRAFT",
}: {
  children: React.ReactNode;
  title: string;
  tooltip?: string;
  withBadge?: boolean;
  type?: "button" | "badge";
  onClick?: () => void;
  badgeValue?: Status | undefined | string;
}) => {
  return (
    <BoxContainer width={"full"} p={"24px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"full"}
      >
        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
          <Heading>{title}</Heading>
          {tooltip && <InfoTip size={"md"} content={tooltip} />}
        </Flex>
        {withBadge && type === "badge" ? (
          <CustomBadge status={badgeValue} type={"product"} />
        ) : type === "button" ? (
          <BaseButton
            p={2}
            colorType={"success"}
            withGradient
            onClick={onClick}
          >
            Ajouter des variants
          </BaseButton>
        ) : null}
      </Flex>
      {children}
    </BoxContainer>
  );
};
