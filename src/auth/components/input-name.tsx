import React from 'react';
import { InputLabels } from '../../constants';
import { Input, InputProps } from '../containers/input';

export function InputName() {
  const inputProps: InputProps = {
    placeholder: 'Your name',
    inputLabel: InputLabels.NAME_INPUT_LABEL,
  };

  return <Input {...inputProps} />;
}
