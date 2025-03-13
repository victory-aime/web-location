import {
  For,
  HStack,
  Icon,
  RadioCardItemDescription,
  Flex,
} from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "_components/ui/radio-card";
import { FC, useState } from "react";
import { Checkbox } from "_components/ui/checkbox";
import { IRadioCardProps } from "./interface/radio-card";

export const CustomRadioCard: FC<IRadioCardProps> = ({
  items,
  labelTitle,
  orientation = "horizontal",
  colorPalette = "black",
  stepButton,
  onValueChange,
  ...rest
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <RadioCardRoot
      orientation={orientation}
      alignItems={"flex-start"}
      justifyContent="space-between"
      size={"lg"}
      mb={"15px"}
      width={"full"}
      colorPalette={colorPalette}
      defaultValue={items[currentIndex]?.label}
      variant={"solid"}
      value={items[currentIndex]?.label}
      onValueChange={(details: { value: string }) => {
        const { value } = details;
        const index = items?.findIndex((item) => item?.label === value);
        setCurrentIndex(index);
        if (onValueChange) onValueChange({ value });
      }}
      {...rest}
    >
      {labelTitle && <RadioCardLabel>{labelTitle}</RadioCardLabel>}

      <HStack width={"full"} flexDir={{ base: "column", md: "row" }}>
        <For each={items}>
          {(item, index) => (
            <Flex
              key={index}
              flexDir={"column"}
              width={"full"}
              wrap={"wrap"}
              gap={3}
            >
              <RadioCardItem
                p={3}
                width={"full"}
                label={item?.label}
                icon={
                  item?.icon ? (
                    <Icon fontSize="2xl" color="fg.subtle">
                      {item.icon}
                    </Icon>
                  ) : undefined
                }
                indicator={<Checkbox checked={index === currentIndex} />}
                key={index}
                value={item?.label}
                indicatorPlacement={"end"}
                description={item?.content}
              />
              {index === currentIndex && stepButton}
            </Flex>
          )}
        </For>
      </HStack>

      {items[currentIndex]?.desc && (
        <RadioCardItemDescription mt={5}>
          {items[currentIndex]?.desc}
        </RadioCardItemDescription>
      )}
    </RadioCardRoot>
  );
};
