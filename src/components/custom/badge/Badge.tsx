import { Badge, HStack, Text } from '@chakra-ui/react';
import React, { FC } from 'react';
import { HiStar } from 'react-icons/hi';
import { GiCancel } from 'react-icons/gi';
import { MdOutlineDoneAll } from 'react-icons/md';
import { TbProgress } from 'react-icons/tb';
import { Props, Status, BadgeType } from './interface/badge';

export const CustomBadge: FC<Props> = ({
  children,
  status = 'NEW',
  variant = 'solid',
  type = 'order',
  ...props
}) => {
  const getBadgeAttributes = (status: Status | string, type: BadgeType) => {
    if (type === 'order') {
      switch (status) {
        case 'DONE':
          return {
            color: 'primary.500',
            icon: <MdOutlineDoneAll />,
            label: 'Livré',
          };
        case 'IN_PROGRESS':
          return { color: 'blue.500', icon: <TbProgress />, label: 'En cours' };
        case 'REJECTED':
          return { color: 'red.500', icon: <GiCancel />, label: 'Annulée' };
        default:
          return { color: 'gray.500', icon: <HiStar />, label: 'Nouvelle' };
      }
    } else {
      switch (status) {
        case 'PUBLISH':
          return {
            color: 'primary.500',
            icon: '',
            label: 'Publié',
          };

        case 'DISABLED':
          return { color: 'red.500', icon: '', label: 'Desactive' };
        default:
          return { color: 'gray.500', icon: '', label: 'Brouillon' };
      }
    }
  };

  const { color, icon, label } = getBadgeAttributes(status, type);

  return (
    <Badge
      {...props}
      variant={variant}
      size="lg"
      borderRadius="7px"
      p={'4px'}
      color="white"
      bgColor={color}
    >
      <HStack gap={1}>
        {icon}
        <Text textTransform="capitalize">{label}</Text>
      </HStack>
    </Badge>
  );
};
