'use client';

import { Box, BoxProps, Flex, Stack } from '@chakra-ui/react';
import React from 'react';
import { boxStyle } from './style';
import { FaPlus } from 'react-icons/fa';
import { BaseText, TextVariant } from '../base-text';
import { ActionsButton, BaseButton } from '../button';
import { ActionButtonTypes } from '../button/interface/button';

interface IBoxProps extends BoxProps {
  title?: string;
  description?: string;
  buttonTitle?: string;
  onClick?: () => void;
  withActionButtons?: boolean;
  actionsButtonProps?: ActionButtonTypes;
}

const BoxContainer = ({
  title,
  description,
  withActionButtons = false,
  actionsButtonProps,
  children,
  ...rest
}: IBoxProps) => {
  if (withActionButtons && !actionsButtonProps) {
    throw new Error('Lorsque vous utiliser withActionButtons, actionsButtonProps est requis');
  }
  return (
    <Box {...boxStyle} {...rest}>
      <Flex flexDir={{ base: 'column', md: 'row' }} justifyContent={'space-between'} gap={5}>
        <Stack gap={2} maxW={{ base: '100%', lg: '800px' }}>
          <BaseText variant={TextVariant.H3}>{title}</BaseText>
          <BaseText variant={TextVariant.M}>{description}</BaseText>
        </Stack>
        {withActionButtons && <ActionsButton {...actionsButtonProps} />}
      </Flex>
      {children}
    </Box>
  );
};

export default BoxContainer;
