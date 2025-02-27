import {
  HStack,
  Icon,
  RadioCardItemDescription,
  RadioCardRootProps,
} from "@chakra-ui/react";
import {
  RadioCardItem,
  RadioCardLabel,
  RadioCardRoot,
} from "_components/ui/radio-card";
import { FC, ReactNode, useState } from "react";

interface IRadioCardProps extends RadioCardRootProps {
  items: {
    label: string;
    icon: ReactNode;
    desc: string;
  }[];
  labelTitle?: string;
  orientation?: "vertical" | "horizontal";
  onValueChange?: (details: { value: string }) => void;
}

export const CustomRadioCard: FC<IRadioCardProps> = ({
  items,
  labelTitle,
  orientation = "horizontal",
  onValueChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <RadioCardRoot
      orientation={orientation}
      align="center"
      justify="center"
      size={"lg"}
      mb={"15px"}
      defaultValue={items[currentIndex]?.label}
      variant={"solid"}
      value={items[currentIndex]?.label}
      onValueChange={(details: { value: string }) => {
        const { value } = details;
        const index = items?.findIndex((item) => item?.label === value);
        setCurrentIndex(index);
        if (onValueChange) onValueChange({ value });
      }}
    >
      {labelTitle && <RadioCardLabel>{labelTitle}</RadioCardLabel>}

      <HStack align="stretch">
        {items.map((item, index) => (
          <RadioCardItem
            p={5}
            label={item.label}
            icon={
              <Icon fontSize="2xl" color="fg.subtle">
                {item.icon}
              </Icon>
            }
            indicator={false}
            key={index}
            value={item.label}
          />
        ))}
      </HStack>
      <RadioCardItemDescription mt={5}>
        {items[currentIndex]?.desc}
      </RadioCardItemDescription>
    </RadioCardRoot>
  );
};
