import { Box, Flex, Heading, useBreakpointValue, Text } from "@chakra-ui/react";
import { BaseButton } from "_/components/custom/button";
import React, { FC, ReactNode, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

interface DisplayItemsProps {
  items: { content: ReactNode }[];
  label: string;
  controlled?: boolean;
  itemsPerPages?: number;
  itemsMobilePage?: number;
  bottomSection?: boolean;
  pageIndex?: number;
  onClick?: () => void;
}

const DisplayItems: FC<DisplayItemsProps> = ({
  items,
  label,
  controlled = true,
  itemsPerPages = 4,
  bottomSection = true,
  itemsMobilePage = 1,
  pageIndex = 0,
  onClick,
}) => {
  const itemsPerPage =
    useBreakpointValue({ base: itemsMobilePage, sm: 4, lg: 4 }) ||
    itemsPerPages;
  const [startIndex, setStartIndex] = useState(pageIndex);
  const totalItems = items.length;

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + itemsPerPage < totalItems;

  const handleNext = () => {
    if (canGoForward) {
      setStartIndex((prev) => Math.min(prev + itemsPerPage, totalItems - 1));
    }
  };

  const handlePrev = () => {
    if (canGoBack) {
      setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
    }
  };

  return (
    <Box p={{ base: 4, lg: 10 }} w={"full"}>
      <Flex width="full" alignItems="center" justifyContent="space-between">
        {label && <Heading size="lg">{label}</Heading>}
        {controlled && (
          <Flex gap={5}>
            <BaseButton
              onClick={handlePrev}
              disabled={!canGoBack}
              leftIcon={<BsArrowLeft />}
              cursor={canGoBack ? "pointer" : "not-allowed"}
            />
            <BaseButton
              onClick={handleNext}
              disabled={!canGoForward}
              leftIcon={<BsArrowRight />}
              cursor={canGoForward ? "pointer" : "not-allowed"}
            />
          </Flex>
        )}
      </Flex>
      <Flex
        mt={10}
        alignItems="center"
        justifyContent="center"
        wrap={"wrap"}
        width={"full"}
        gap={8}
      >
        {items
          ?.slice(startIndex, startIndex + itemsPerPage)
          ?.map((item, index) => <>{item?.content}</>)}
      </Flex>
      {bottomSection && (
        <Flex mt={10} alignItems="center" justifyContent="flex-end">
          <BaseButton onClick={onClick}>Voir plus</BaseButton>
        </Flex>
      )}
    </Box>
  );
};

export default DisplayItems;
