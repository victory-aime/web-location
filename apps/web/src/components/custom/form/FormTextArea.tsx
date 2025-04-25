import React, { FC } from 'react'
import { useField } from 'formik'
import { Field, Flex, Text, Textarea } from '@chakra-ui/react'
import { FormTextAreaProps } from './interface/input'
import { HiOutlineInformationCircle } from 'react-icons/hi'

const FormTextArea: FC<FormTextAreaProps> = ({
  required = false,
  label,
  value,
  onChangeFunction,
  name,
  placeholder,
  width,
  localErrorMsg,
  isReadOnly,
  isDisabled,
  validate,
  minHeight,
  helperMessage,
  autoresize = true,
}) => {
  const fieldHookConfig = {
    name,
    validate,
  }

  const [field, { touched, error }] = useField(fieldHookConfig)
  const isError = isReadOnly ? !!error : !!(touched && error)

  return (
    <Field.Root id={name} invalid={isError}>
      {label && (
        <Field.Label display={'flex'} gap={'6px'}>
          {label}
          {required && <Text color={'red'}> * </Text>}
        </Field.Label>
      )}
      <Textarea
        {...field}
        bg={'bg.muted'}
        autoresize={autoresize}
        border={'1px solid'}
        borderColor={isError ? 'red.500' : 'bg.muted'}
        _focus={{ borderColor: 'primary.500' }}
        _placeholder={{ color: isError ? 'red.500' : 'gray.400' }}
        placeholder={placeholder ?? ''}
        fontSize={'16px'}
        width={width}
        height={minHeight}
        p={3}
        mt={'5px'}
        borderRadius={'7px'}
        value={value ?? field.value}
        onChange={(event: never) => {
          onChangeFunction(event)
        }}
        readOnly={isReadOnly}
        disabled={isDisabled}
        onBlur={(e) => {
          field.onBlur(e)
        }}
      />
      {localErrorMsg || helperMessage ? (
        <Flex p={1} gap={2}>
          <HiOutlineInformationCircle size={18} color={isError ? 'red' : 'none'} />
          <Field.HelperText>{localErrorMsg ? localErrorMsg : helperMessage ? null : ''}</Field.HelperText>
        </Flex>
      ) : null}
      {isError && <Field.ErrorText>{error}</Field.ErrorText>}
    </Field.Root>
  )
}

export default FormTextArea
