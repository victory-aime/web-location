"use client";
import React, { FC, useCallback, useState } from "react";
import { PaginationProps } from "../interface/data-types";
import { Flex, Text, Input } from "@chakra-ui/react";
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "_components/ui/pagination";
import { Button } from "_components/ui/button";

const PaginationDataTable: FC<PaginationProps> = ({
  table,
  totalItems,
  pageSize,
  currentPage,
  lazy,
  onLazyLoad,
}) => {
  if (lazy && (totalItems === undefined || currentPage === undefined)) {
    throw new Error(
      "With lazy loading, totalItems and current Page are required"
    );
  }

  const [currentIndexPage, setCurrentIndexPage] = useState<number>(
    !lazy ? 1 : currentPage!
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(pageSize);

  const handleClick = useCallback(
    (index: number | string) => {
      if (index !== "...") {
        if (index === "previous") {
          table.previousPage();
          setCurrentIndexPage((value) => value - 1);
          onLazyLoad?.(currentIndexPage - 1);
        } else if (index === "next") {
          table.nextPage();
          setCurrentIndexPage((value) => value + 1);
          onLazyLoad?.(currentIndexPage + 1);
        } else {
          setCurrentIndexPage(+index);
          table.setPageIndex(+index - 1);
          onLazyLoad?.(+index);
        }
      }
    },
    [currentIndexPage, table, onLazyLoad]
  );

  const [inputPageValue, setInputPageValue] = useState<string>(
    currentIndexPage.toString()
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputPageValue(event.target?.value);
  };

  const handleGoToPage = () => {
    const page = Number(inputPageValue);
    if (!isNaN(page) && page > 0 && page <= totalItems!) {
      setCurrentIndexPage(page);
      table.setPageIndex(page - 1);
      onLazyLoad?.(page);
    } else {
      setInputPageValue(currentIndexPage.toString());
    }
  };

  const getPreviousPage = () => {
    if (currentIndexPage > 1) {
      setCurrentIndexPage((p) => {
        const newPage = Math.max(p - 1, 1);
        table?.setPageIndex(newPage - 1);
        onLazyLoad?.(newPage);
        return newPage;
      });
    }
  };
  const getNextPage = () => {
    if (currentIndexPage < totalItems!) {
      setCurrentIndexPage((p) => {
        const newPage = Math.min(p + 1, totalItems!);
        table?.setPageIndex(newPage - 1);
        onLazyLoad?.(newPage);
        return newPage;
      });
    }
  };

  return (
    <Flex alignItems="center" justifyContent={"space-between"} w="full" mt={8}>
      <Flex wrap="wrap">
        <PaginationRoot
          count={(totalItems && totalItems) || 0}
          pageSize={pageSize}
          page={itemsPerPage}
        >
          <PaginationPrevTrigger onClick={getPreviousPage} />
          {Array.from({ length: totalItems! }).map((_, i) => (
            <Button
              key={i}
              size="sm"
              bg={currentIndexPage === i + 1 ? "primary.500" : "none"}
              color={currentIndexPage === i + 1 ? "white" : "whiteAlpha.400"}
              onClick={() => handleClick(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <PaginationNextTrigger onClick={getNextPage} />
        </PaginationRoot>
      </Flex>
      <Flex alignItems={"center"} justifyContent={"center"} gap={5}>
        <Flex alignItems={"center"} justifyContent={"center"} gap={2}>
          <Text>Go to Page</Text>
          <Input
            type="number"
            min={currentPage}
            max={pageSize}
            value={inputPageValue}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleGoToPage();
              }
            }}
            p={"10px"}
            width={"50px"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PaginationDataTable;
