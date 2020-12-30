import React from 'react';
import { useSelector } from 'react-redux';
import { InputLabels } from '../constants';
import { Input, InputProps } from '../containers/input';
import { authController } from '../controllers/auth.controller';
import { storeSelectors } from '../store';

export function InputName() {
  const inputLabel = InputLabels.NAME_INPUT_LABEL;
  const {value, error} = useSelector(storeSelectors.getInput(inputLabel));

  const inputProps: InputProps = {
    placeholder: 'Your name',
    value,
    error,
    updateValue: (newValue: string) => {
      authController.updateInputValue(newValue, inputLabel);
    },
  };

  return <Input {...inputProps} />;
}
