import { Field, Flex, FormatNumber, Text } from '@chakra-ui/react';
import { Slider } from '_/components/ui/slider';
import { useField } from 'formik';
import React, { FC } from 'react';
import { DefaultProps } from './interface/input';

const SliderForm: FC<DefaultProps> = ({
  name,
  validate,
  label,
  required,
  isNumber,
  min = 10,
  max = 1000,
  onChangeFunction,
  ...rest
}) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }, helpers] = useField(fieldHookConfig);
  const { setValue } = helpers;
  const isError = !!error || !!(touched && error);

  return (
    <Field.Root {...rest} id={name} invalid={isError}>
      {label && (
        <Field.Label
          display={'flex'}
          gap={'6px'}
          fontSize={{ base: '16px', lg: '18px' }}
        >
          {label}
          {required ? (
            <Text color={'red'}> * </Text>
          ) : isNumber ? (
            <Flex ml={3} gap={2} alignItems={'center'}>
              <FormatNumber
                value={field.value}
                currency="USD"
                notation="compact"
                style={'currency'}
              />
              -
              <FormatNumber
                value={max}
                currency="USD"
                notation="compact"
                style={'currency'}
              />
            </Flex>
          ) : null}
        </Field.Label>
      )}

      <Slider
        {...field}
        width="full"
        name={field.name}
        defaultValue={[min]}
        value={[field.value]}
        onFocusChange={({ focusedIndex, value }) => {
          if (focusedIndex !== -1) return;
          setValue(value[0]);
          onChangeFunction?.(value[0]);
        }}
        onValueChange={({ value }) => {
          setValue(value[0]);
          onChangeFunction?.(value[0]);
        }}
        min={min}
        max={max}
      />
    </Field.Root>
  );
};

export default SliderForm;
