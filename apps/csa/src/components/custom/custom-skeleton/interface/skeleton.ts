import { variantColorType } from '_components/custom/button'

type LoaderType = 'BAR_CHART' | 'DATA_TABLE' | 'DONUT_CHART' | 'PRODUCT_LIST_CARD' | 'DEFAULT' | 'TEXT' | 'IMAGE' | 'TEXT_IMAGE' | 'BUTTON'

interface CustomSkeletonLoaderProps {
  type?: LoaderType
  tableColumns?: number
  tableRows?: number
  width?: string | number
  height?: string | number
  statisticBars?: number
  count?: number
  variant?: 'pulse' | 'shine'
  direction?: any
  numberOfLines?: number
  colorButton?: variantColorType
}

export type { LoaderType, CustomSkeletonLoaderProps }
