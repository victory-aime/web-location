import { BadgeProps } from '@chakra-ui/react/badge'
import { TYPES } from 'bvg-innovation-shared'

type Status = TYPES.MODELS.PRODUCTS.OrderItemStatus | TYPES.MODELS.PRODUCTS.ProductStatus

type BadgeType = 'order' | 'product'

interface Props extends BadgeProps {
  status?: Status | undefined | string
  type?: BadgeType
  variant?: 'outline' | 'solid' | 'subtle' | 'surface' | 'plain' | undefined
  children?: React.ReactNode
}

export type { Props, BadgeType, Status }
