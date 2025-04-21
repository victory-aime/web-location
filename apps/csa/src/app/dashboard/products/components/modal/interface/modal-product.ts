import { ModalOpenProps } from '_components/custom'

type ProductDeleteType = 'soft' | 'permanently'

export interface IProductMoalProps extends ModalOpenProps {
  selectedValues: any
  isLoading?: boolean
  deleteType?: ProductDeleteType
}
