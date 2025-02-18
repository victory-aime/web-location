"use client";

import {
  Badge,
  FormatNumber,
  HStack,
  Stat,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import BoxContainer from "_components/custom/container/BoxContainer";
import { InfoTip } from "_/components/ui/toggle-tip";
import { hexToRGB, Colors } from "_/theme/colors";
import { FC } from "react";

interface StatsProps extends Stat.RootProps {
  icon: React.ReactNode;
  color: keyof Colors;
  opacity?: number;
  iconColor?: string;
  badgeColor?: string;
  title: string;
  value: number;
  infoMesssage?: string;
  helpMessage?: string;
  percent: number;
}

export const ReviewStats: FC<StatsProps> = ({
  color = "primary",
  opacity = 500,
  iconColor,
  badgeColor = "red",
  icon,
  infoMesssage = "tooltip info",
  helpMessage = "",
  percent = 0.245,
  title,
  value = 0,
  ...rest
}) => {
  const onMobile = useBreakpointValue({ base: true, md: false });

  return (
    <BoxContainer
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
      _hover={{
        bg: hexToRGB(color, 0.2, opacity),
      }}
    >
      <Flex
        borderRadius={"full"}
        p={"14px"}
        alignItems={"center"}
        justifyContent={"center"}
        bgColor={hexToRGB(color, 0.2, opacity)}
        color={iconColor}
      >
        {icon && icon}
      </Flex>

      <Stat.Root {...rest}>
        <Stat.Label>
          {title && (
            <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
              {title}
              <InfoTip
                positioning={{
                  placement: onMobile ? "right-start" : "bottom-start",
                }}
                lazyMount
                size={"sm"}
                content={infoMesssage}
              />
            </Flex>
          )}
        </Stat.Label>
        <HStack
          width={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stat.ValueText alignItems={"center"} justifyContent={"center"}>
            <FormatNumber
              notation="compact"
              style={"currency"}
              currency={"USD"}
              value={value}
            />
          </Stat.ValueText>
          <Badge
            colorPalette={badgeColor}
            gap="4px"
            p={"8px"}
            borderRadius={"full"}
          >
            {badgeColor !== "red" ? (
              <Stat.UpIndicator color={badgeColor} />
            ) : (
              <Stat.DownIndicator />
            )}
            <FormatNumber style="percent" value={percent} />
          </Badge>
        </HStack>
        {helpMessage && <Stat.HelpText>{helpMessage}</Stat.HelpText>}
      </Stat.Root>
    </BoxContainer>
  );
};
