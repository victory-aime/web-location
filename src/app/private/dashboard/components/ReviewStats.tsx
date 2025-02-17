import { Badge, FormatNumber, HStack, Stat, Flex } from "@chakra-ui/react";
import BoxContainer from "_components/custom/container/BoxContainer";
import { InfoTip } from "_/components/ui/toggle-tip";
import { hexToRGB, Colors } from "_/theme/colors";
import { FC } from "react";

interface StatsProps extends Stat.RootProps {
  icon: React.ElementType;
  color: keyof Colors;
  opacity?: number;
  iconColor?: string;
  badgeColor?: string;
  title: string;
  value: number;
  helpMessage?: string;
  percent: number;
  currency?: string;
}

export const ReviewStats: FC<StatsProps> = ({
  color = "primary",
  opacity = 500,
  iconColor,
  badgeColor = "red",
  icon: Icon,
  currency = "FCFA",
  helpMessage = "tooltip info",
  percent = 0.245,
  title,
  value = 0,
  ...rest
}) => {
  return (
    <BoxContainer
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      gap={4}
    >
      <Flex
        borderRadius={"full"}
        p={"14px"}
        bgColor={hexToRGB(color, 0.2, opacity)}
      >
        {Icon && <Icon width={"22px"} height={"22px"} fill={iconColor} />}
      </Flex>
      <Stat.Root {...rest}>
        <Stat.Label>
          {title && (
            <Flex alignItems={"center"} justifyContent={"center"} gap={"4px"}>
              {title}
              <InfoTip lazyMount size={"sm"} content={helpMessage} />
            </Flex>
          )}
        </Stat.Label>
        <HStack
          width={"full"}
          alignItems={"flex-start"}
          justifyContent={"space-between"}
        >
          <Stat.ValueText alignItems={"center"} gap={2}>
            <FormatNumber notation="compact" value={value} />
            <Stat.ValueUnit
              fontSize={"24px"}
              fontWeight={"bolder"}
              color={"white"}
            >
              {currency}
            </Stat.ValueUnit>
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
        <Stat.HelpText>{helpMessage}</Stat.HelpText>
      </Stat.Root>
    </BoxContainer>
  );
};
