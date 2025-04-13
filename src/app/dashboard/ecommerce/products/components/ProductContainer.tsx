import { Flex, Heading } from '@chakra-ui/react';
import {CustomToolTip} from '_components/custom/tooltip/CustomTooltip';
import { CustomBadge } from '_components/custom/badge';
import { Status } from '_components/custom/badge/interface/badge';
import { BaseButton } from '_components/custom/button';
import BoxContainer from '_components/custom/container/BoxContainer';
import React from 'react';
import { HiOutlineInformationCircle } from 'react-icons/hi2';

export const ProductContainer = ({
  children,
  title,
  tooltip,
  withBadge = false,
  type = 'badge',
  onClick,
  badgeValue = 'DRAFT',
}: {
  children: React.ReactNode;
  title: string;
  tooltip?: string;
  withBadge?: boolean;
  type?: 'button' | 'badge';
  onClick?: () => void;
  badgeValue?: Status | undefined | string;
}) => {
  return (
    <BoxContainer width={'full'} p={'24px'}>
      <Flex alignItems={'center'} justifyContent={'space-between'} width={'full'}>
        <Flex gap={4} alignItems={'center'} justifyContent={'center'}>
          <Heading>{title}</Heading>
          {tooltip && (
            <CustomToolTip message={tooltip}>
              <HiOutlineInformationCircle size={24} />
            </CustomToolTip>
          )}
        </Flex>
        {withBadge && type === 'badge' ? (
          <CustomBadge status={badgeValue} type={'product'} />
        ) : type === 'button' ? (
          <BaseButton p={2} colorType={'success'} withGradient onClick={onClick}>
            Ajouter des variants
          </BaseButton>
        ) : null}
      </Flex>
      {children}
    </BoxContainer>
  );
};
