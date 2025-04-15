import { BadgeProps } from '@chakra-ui/react/badge';
import { TYPES } from 'bvg-shared';

type Status = TYPES.MODELS.PRODUCTS.OrderStatus | TYPES.MODELS.PRODUCTS.ProductStatus;

type BadgeType = 'order' | 'product';

interface Props extends BadgeProps {
  status?: Status | undefined | string;
  type?: BadgeType;
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined;
  children?: React.ReactNode;
}

export type { Props, BadgeType, Status };
