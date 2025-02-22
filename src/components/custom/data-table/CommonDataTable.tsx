import { Box, Button, Center, Table } from "@chakra-ui/react";
import React, { useEffect, useState, FC } from "react";
import { Checkbox } from "_components/ui/checkbox";
import {
  ActionBarRoot,
  ActionBarContent,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "_components/ui/action-bar";
import PaginationDataTable from "./components/PaginationDataTable";
import { TableProps } from "./interface/data-types";
import { ActionButtons } from "./ActionButtons";
import { Skeleton, SkeletonText } from "_/components/ui/skeleton";
import { NoDataFoundLottieAnimation } from "_lottie/animations/LottieAnimation";

export const CommonDataTable: FC<TableProps> = ({
  data,
  columns,
  handleRowSelection,
  minH = "10rem",
  hidePagination = false,
  isLoading,
  totalItems,
  initialPage = 1,
  pageSize = 5,
  lazy = false,
}) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < data.length;

  const sortedData =
    Array.isArray(data) && data.length > 0
      ? [...data].sort((a, b) => {
          if (!sortConfig) return 0;
          const { key, direction } = sortConfig;
          return direction === "asc"
            ? a[key] > b[key]
              ? 1
              : -1
            : a[key] < b[key]
              ? 1
              : -1;
        })
      : [];

  const paginatedItems = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = (checked: boolean) => {
    setSelection(checked ? data.map((item) => item.id) : []);
  };

  useEffect(() => {
    handleRowSelection?.(data.filter((item) => selection.includes(item.id)));
  }, [selection]);

  if (isLoading) {
    return (
      <Box overflowX="auto" width="full">
        <Table.Root minH={minH}>
          <Table.Header>
            <Table.Row>
              {columns.map((col, index) => (
                <Table.ColumnHeader
                  key={col.accessor.toString()}
                  minW="150px"
                  p={2}
                >
                  <Skeleton height="20px" width="80%" />
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {Array.from({ length: pageSize }).map((_, rowIndex) => (
              <Table.Row key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <Table.Cell key={col.accessor.toString()} minW="150px" p={2}>
                    <SkeletonText noOfLines={1} />
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>
    );
  }

  if (data?.length === 0) {
    return (
      <Center width={"full"} height={"30%"}>
        <NoDataFoundLottieAnimation />
      </Center>
    );
  }

  return (
    <Box overflowX={"auto"} width={"full"}>
      <Table.Root minH={minH}>
        <Table.Header>
          <Table.Row>
            {columns.map((col) => (
              <Table.ColumnHeader
                minW={col.accessor !== "select" ? "150px" : "0"}
                key={col.accessor.toString()}
                p={2}
                onClick={() =>
                  col.accessor !== "select" &&
                  setSortConfig({
                    key: col.accessor.toString(),
                    direction: sortConfig?.direction === "asc" ? "desc" : "asc",
                  })
                }
              >
                {col.accessor === "select" ? (
                  <Checkbox
                    aria-label="Select all rows"
                    checked={
                      indeterminate ? "indeterminate" : selection.length > 0
                    }
                    onCheckedChange={(changes) =>
                      handleSelectAll(!!changes.checked)
                    }
                  />
                ) : (
                  <>
                    {col.header}{" "}
                    {sortConfig?.key === col.accessor &&
                      (sortConfig.direction === "asc" ? "⬆" : "⬇")}
                  </>
                )}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems?.map((item) => (
            <Table.Row key={item.id}>
              {columns?.map((col) => (
                <Table.Cell
                  minW={col.accessor !== "select" ? "150px" : "0"}
                  bgColor={selection.includes(item.id) ? "gray.500" : "none"}
                  p={2}
                  key={col.accessor.toString()}
                >
                  {col.accessor === "select" ? (
                    <Checkbox
                      aria-label="Select item"
                      checked={selection.includes(item.id)}
                      onCheckedChange={(changes) => {
                        setSelection((prev) =>
                          changes.checked
                            ? [...prev, item.id]
                            : prev.filter((id) => id !== item.id)
                        );
                      }}
                    />
                  ) : col.accessor === "actions" && col.actions ? (
                    <ActionButtons actions={col?.actions} item={item} />
                  ) : col.cell ? (
                    col.cell(item[col.accessor])
                  ) : (
                    item[col.accessor]
                  )}
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} sélectionné(s)
          </ActionBarSelectionTrigger>
          <ActionBarSeparator />
          <Button variant="outline" size="sm">
            Delete
          </Button>
          <Button variant="outline" size="sm">
            Share
          </Button>
        </ActionBarContent>
      </ActionBarRoot>

      {!hidePagination && (
        <PaginationDataTable
          table={{
            setPageIndex: (index: number) => setCurrentPage(index + 1),
          }}
          totalItems={totalItems!}
          pageSize={pageSize}
          currentPage={currentPage}
          lazy={lazy}
          onLazyLoad={(index) => setCurrentPage(index)}
        />
      )}
    </Box>
  );
};
