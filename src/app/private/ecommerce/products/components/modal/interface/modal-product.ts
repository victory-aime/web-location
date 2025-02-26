import { ModalOpenProps } from "_/components/custom/modal/interface/modal";

type ProductDeleteType = "soft" | "permanently";

export interface IProductMoalProps extends ModalOpenProps {
  selectedValues: any;
  isLoading?: boolean;
  deleteType?: ProductDeleteType;
}
