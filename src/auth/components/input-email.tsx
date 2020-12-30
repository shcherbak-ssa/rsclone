import React from 'react';
import { InputLabels } from '../constants';
import { Input, InputProps } from '../containers/input';

export function InputEmail() {
  const inputProps: InputProps = {
    placeholder: 'E-mail',
    inputLabel: InputLabels.EMAIL_INPUT_LABEL,
  };

  return <Input {...inputProps} />;
}
