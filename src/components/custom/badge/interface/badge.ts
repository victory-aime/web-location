import { BadgeProps } from "@chakra-ui/react/badge";

type OrderStatus = "NEW" | "DONE" | "IN_PROGRESS" | "REJECTED";
type ProductStatus = "PUBLISH" | "LOW_SCTOK" | "OUT_STOCK" | "DRAFT";

type Status = OrderStatus | ProductStatus;

type BadgeType = "order" | "product";

interface Props extends BadgeProps {
  status?: Status;
  type?: BadgeType;
  variant?: "outline" | "solid" | "subtle" | "surface" | "plain" | undefined;
  children?: React.ReactNode;
}

export type { Props, OrderStatus, ProductStatus, BadgeType, Status };
