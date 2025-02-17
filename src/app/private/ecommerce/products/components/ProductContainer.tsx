import { Flex, Heading } from "@chakra-ui/react";
import { CustomBadge } from "_/components/custom/badge";
import { Status } from "_/components/custom/badge/interface/badge";
import BoxContainer from "_/components/custom/container/BoxContainer";
import { InfoTip } from "_/components/ui/toggle-tip";
import React from "react";

export const ProductContainer = ({
  children,
  title,
  tooltip,
  withBadge = false,
  badgeValue,
}: {
  children: React.ReactNode;
  title: string;
  tooltip?: string;
  withBadge?: boolean;
  badgeValue?: Status;
}) => {
  return (
    <BoxContainer p={"24px"}>
      <Flex
        alignItems={"center"}
        justifyContent={"space-between"}
        width={"full"}
      >
        <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
          <Heading>{title}</Heading>
          {tooltip && <InfoTip size={"md"} content={tooltip} />}
        </Flex>
        {withBadge && <CustomBadge status={badgeValue} type={"product"} />}
      </Flex>
      {children}
    </BoxContainer>
  );
};
