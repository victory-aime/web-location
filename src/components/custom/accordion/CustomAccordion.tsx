import { AccordionRootProps, Icon } from "@chakra-ui/react";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "_components/ui/accordion";
import { FC, ReactNode, useState } from "react";

interface AccordionProps extends AccordionRootProps {
  items: {
    label: string;
    icon: ReactNode;
    content: ReactNode | string | any;
  }[];
}

export const CustomAccordion: FC<AccordionProps> = ({ items, ...rest }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <AccordionRoot
      collapsible
      p={5}
      width={"full"}
      variant={"plain"}
      defaultValue={[items[currentIndex]?.label]}
      value={[items[currentIndex]?.label]}
      onValueChange={(details: { value: string[] }) => {
        const index = items?.findIndex(
          (item) => item?.label === details.value[0],
        );
        setCurrentIndex(index);
      }}
      {...rest}
    >
      {items.map((item, index) => (
        <AccordionItem mt={5} key={index} value={item.label}>
          <AccordionItemTrigger mb={8}>
            {item?.icon && (
              <Icon fontSize="lg" color="fg.subtle">
                {item.icon}
              </Icon>
            )}
            {item.label}
          </AccordionItemTrigger>
          <AccordionItemContent>{item.content}</AccordionItemContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
