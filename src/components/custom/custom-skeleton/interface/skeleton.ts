type LoaderType =
  | "BAR_CHART"
  | "DATA_TABLE"
  | "DONUT_CHART"
  | "PRODUCT_LIST_CARD"
  | "DEFAULT";

interface CustomSkeletonLoaderProps {
  type?: LoaderType;
  tableColumns?: number;
  tableRows?: number;
  width?: string | number;
  height?: string | number;
  statisticBars?: number;
  count?: number;
}

export type { LoaderType, CustomSkeletonLoaderProps };
