import { Button, Center, HStack, Spinner, Table } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Checkbox } from "_components/ui/checkbox";
import { BaseButton } from "_components/custom/button";
import {
  ActionBarRoot,
  ActionBarContent,
  ActionBarSelectionTrigger,
  ActionBarSeparator,
} from "_components/ui/action-bar";
import NoDataFound from "../no-data-found/NoDataFound";
import PaginationDataTable from "./components/PaginationDataTable";

interface TableProps {
  data: any[];
  actions?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onDetails?: (id: number) => void;
  totalItems?: number;
  initialPage?: number;
  minH?: number | string;
  page?: number;
  pageSize?: number;
  lazy?: boolean;
  handleRowSelection?: (item: any) => void;
  enabledSort?: boolean;
  hidePagination?: boolean;
  isLoading?: boolean;
  isShow?: {
    edit?: boolean;
    delete?: boolean;
    details?: boolean;
  };
}

export const CustomTable: React.FC<TableProps> = ({
  data,
  actions = true,
  onEdit,
  onDelete,
  onDetails,
  handleRowSelection,
  hidePagination = false,
  isLoading,
  isShow = { edit: true, delete: true, details: true },
  totalItems,
  initialPage = 1,
  pageSize = 5,
  lazy = false,
}) => {
  const [selection, setSelection] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof any;
    direction: "asc" | "desc";
  } | null>(null);

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < data.length;

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    return direction === "asc"
      ? a[key] > b[key]
        ? 1
        : -1
      : a[key] < b[key]
        ? 1
        : -1;
  });

  const paginatedItems = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSelectAll = (checked: boolean) => {
    setSelection(checked ? data.map((item) => item.id) : []);
  };

  useEffect(() => {
    handleRowSelection?.(Object.values(selection));
  }, [selection]);

  if (isLoading) {
    return (
      <Center minH="30rem">
        <Spinner />
      </Center>
    );
  }

  if (data?.length === 0) {
    return <NoDataFound />;
  }

  return (
    <>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>
              <Checkbox
                aria-label="Select all rows"
                checked={indeterminate ? "indeterminate" : selection.length > 0}
                onCheckedChange={(changes) =>
                  handleSelectAll(!!changes.checked)
                }
              />
            </Table.ColumnHeader>
            <Table.ColumnHeader
              onClick={() =>
                setSortConfig({
                  key: "name",
                  direction: sortConfig?.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Product{" "}
              {sortConfig?.key === "name" &&
                (sortConfig.direction === "asc" ? "⬆" : "⬇")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              onClick={() =>
                setSortConfig({
                  key: "category",
                  direction: sortConfig?.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Category{" "}
              {sortConfig?.key === "category" &&
                (sortConfig.direction === "asc" ? "⬆" : "⬇")}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              onClick={() =>
                setSortConfig({
                  key: "price",
                  direction: sortConfig?.direction === "asc" ? "desc" : "asc",
                })
              }
            >
              Price{" "}
              {sortConfig?.key === "price" &&
                (sortConfig.direction === "asc" ? "⬆" : "⬇")}
            </Table.ColumnHeader>
            {actions && <Table.ColumnHeader>Actions</Table.ColumnHeader>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
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
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>${item.price}</Table.Cell>
              {actions && (
                <Table.Cell>
                  <HStack gap={2}>
                    {isShow.details && (
                      <BaseButton
                        colorType="primary"
                        size="sm"
                        onClick={() => onDetails?.(item.id)}
                      >
                        Details
                      </BaseButton>
                    )}
                    {isShow.edit && (
                      <BaseButton
                        colorType="warning"
                        size="sm"
                        onClick={() => onEdit?.(item.id)}
                      >
                        Modifier
                      </BaseButton>
                    )}
                    {isShow.delete && (
                      <BaseButton
                        colorType="danger"
                        size="sm"
                        onClick={() => onDelete?.(item.id)}
                      >
                        Supprimer
                      </BaseButton>
                    )}
                  </HStack>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <ActionBarRoot open={hasSelection}>
        <ActionBarContent>
          <ActionBarSelectionTrigger>
            {selection.length} selected
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
          table={{ setPageIndex: (index: number) => setCurrentPage(index + 1) }}
          totalItems={totalItems!}
          pageSize={pageSize}
          currentPage={currentPage}
          lazy={lazy}
          onLazyLoad={(index) => setCurrentPage(index)}
        />
      )}
    </>
  );
};
