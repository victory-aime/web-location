'use client';

import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { BaseButton } from '../base/baseButton';
import { IoSave } from 'react-icons/io5';
import { hexToRGB } from '_theme/colors';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import { ActionButtonTypes } from '../interface/button';

export const ActionsButton = ({
  cancelTitle,
  validateTitle,
  goBackUrl,
  requestId,
  isLoading = false,
  cancelColor = 'danger',
  validateColor = 'success',
  onClick,
  ...rest
}: ActionButtonTypes) => {
  if (cancelTitle && !goBackUrl) {
    throw new Error('goBackUrl is missing');
  }
  const router = useRouter();
  return (
    <Flex gap={3} {...rest}>
      {cancelTitle && (
        <BaseButton
          px={'15px'}
          withGradient
          colorType={cancelColor}
          leftIcon={cancelColor === 'danger' ? <GiCancel /> : <IoIosArrowDropleftCircle />}
          onClick={() => {
            router.push(goBackUrl ?? '');
          }}
        >
          {cancelTitle}
        </BaseButton>
      )}

      {validateTitle && (
        <BaseButton
          onClick={onClick}
          px={'15px'}
          colorType={validateColor}
          withGradient
          isLoading={isLoading}
          leftIcon={requestId ? <IoSave /> : <FaPlus />}
        >
          {validateTitle}
        </BaseButton>
      )}
    </Flex>
  );
};
