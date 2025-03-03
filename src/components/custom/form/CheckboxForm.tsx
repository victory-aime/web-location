import { Field } from '@chakra-ui/react';
import { Checkbox } from '_/components/ui/checkbox';
import { useField } from 'formik';
import React, { useState } from 'react';

const CheckboxForm = ({
  name,
  validate,
  label,
}: {
  name: string;
  validate?: any;
  label: string;
}) => {
  const fieldHookConfig = {
    name,
    validate,
  };
  const [field, { touched, error }, helpers] = useField(fieldHookConfig);
  const { setValue } = helpers;
  const [isChecked, setIschecked] = useState<boolean>(false);
  const isError = !!error || !!(touched && error);

  return (
    <Field.Root id={name} invalid={isError}>
      <Checkbox
        {...field}
        name={name}
        checked={field.value}
        colorPalette={isChecked ? 'green' : 'none'}
        onCheckedChange={({ checked }) => {
          setValue(checked);
          setIschecked(true);
        }}
        mb={4}
      >
        {label}
      </Checkbox>
    </Field.Root>
  );
};

export default CheckboxForm;
