import { Badge, HStack } from '@chakra-ui/react'
import React, { FC } from 'react'
import { HiStar } from 'react-icons/hi'
import { GiCancel } from 'react-icons/gi'
import { MdOutlineDoneAll } from 'react-icons/md'
import { TbProgress } from 'react-icons/tb'
import { Props, Status, BadgeType } from './interface/badge'
import { BaseText, TextVariant } from '../base-text'

export const CustomBadge: FC<Props> = ({ children, status = 'PENDING', variant = 'solid', type = 'order', ...props }) => {
  const getBadgeAttributes = (status: Status | string, type: BadgeType) => {
    if (type === 'order') {
      switch (status) {
        case 'DELIVERED':
          return {
            color: 'primary.500',
            icon: <MdOutlineDoneAll />,
            label: 'Livré',
          }
        case 'SHIPPED':
          return { color: 'blue.500', icon: <TbProgress />, label: 'Expedié' }
        case 'CANCELED':
          return { color: 'red.500', icon: <GiCancel />, label: 'Annulée' }
        default:
          return { color: 'orange.500', icon: <HiStar />, label: 'En attente' }
      }
    } else {
      switch (status) {
        case 'PUBLISH':
          return {
            color: 'primary.500',
            icon: '',
            label: 'Publié',
          }

        case 'DISABLED':
          return { color: 'red.500', icon: '', label: 'Desactive' }
        default:
          return { color: 'gray.500', icon: '', label: 'Brouillon' }
      }
    }
  }

  const { color, icon, label } = getBadgeAttributes(status, type)

  return (
    <Badge {...props} variant={variant} size="lg" borderRadius="7px" p={'10px'} color="white" bgColor={color}>
      <HStack gap={1}>
        {icon}
        <BaseText variant={TextVariant.S} textTransform="capitalize">
          {label}
        </BaseText>
      </HStack>
    </Badge>
  )
}
