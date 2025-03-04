import { Box, SimpleGrid, Stack, Table } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
} from "_components/ui/skeleton";
import { CustomSkeletonLoaderProps, LoaderType } from "./interface/skeleton";

const CustomSkeletonLoader: FunctionComponent<CustomSkeletonLoaderProps> = ({
  tableColumns,
  tableRows = 5,
  type,
  width,
  height = "300px",
}) => {
  const DefaultBlockLoader = <Skeleton height={height} />;

  const TableLoader = (
    <Table.Root minH={height}>
      <Table.Header>
        <Table.Row>
          {Array.from({ length: tableColumns || 1 }, (_, i) => (
            <Table.Header key={`Thead-${i}`}>
              <Skeleton variant={"shine"} h={"5px"} />
            </Table.Header>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body minH={"190px"}>
        {Array.from({ length: tableRows || 1 }, (_, j) => (
          <Table.Row key={`StyledTr-${j}`}>
            {Array.from({ length: tableColumns || 1 }, ($, k) => (
              <Table.ColumnHeader key={`StyledTd-${j}-${k}`}>
                <Skeleton variant={"shine"} height={"25px"} />
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );

  const PublicProductCard = (
    <SimpleGrid columns={{ base: 2, md: 4 }} width={"full"}>
      {Array.from({ length: 6 }, (_, i) => (
        <Box p={5} width={"full"}>
          <Box key={`box-${i}`}>
            <Skeleton variant={"shine"} borderRadius={"7px"} height={height} />
          </Box>
          <Stack mt={4}>
            <SkeletonText />
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  );

  const DonutChartLoader = (
    <Box
      height={height || "250px"}
      width={width || "250px"}
      position="relative"
      p={3}
    >
      <SkeletonCircle width="100%" height="90%" />
      <Box
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="50%"
        height="50%"
        bg="white"
        zIndex={1}
        borderRadius="50%"
      />
    </Box>
  );

  function renderSkeletonSwitch(param: LoaderType) {
    switch (param) {
      case "DATA_TABLE":
        return TableLoader;
      case "DONUT_CHART":
        return DonutChartLoader;
      case "PRODUCT_LIST_CARD":
        return PublicProductCard;
      case "DEFAULT":
        return DefaultBlockLoader;
      default:
        return null;
    }
  }

  return renderSkeletonSwitch(type ?? "DEFAULT");
};

export default CustomSkeletonLoader;
