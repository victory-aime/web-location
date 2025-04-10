import { BadgeProps } from '@chakra-ui/react/badge';

type OrderStatus = 'NEW' | 'DONE' | 'IN_PROGRESS' | 'REJECTED';
type ProductStatus = 'PUBLISH' | 'DISABLED' | 'DRAFT';

type Status = OrderStatus | ProductStatus;

type BadgeType = 'order' | 'product';

interface Props extends BadgeProps {
  status?: Status | undefined | string;
  type?: BadgeType;
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined;
  children?: React.ReactNode;
}

export type { Props, OrderStatus, ProductStatus, BadgeType, Status };
