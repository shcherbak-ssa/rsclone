import React from 'react';
import { useSelector } from 'react-redux';
import { InputLabels } from '../constants';
import { Input, InputProps } from '../containers/input';
import { authController } from '../controllers/auth.controller';
import { storeSelectors } from '../store';

export function InputEmail() {
  const inputLabel = InputLabels.EMAIL_INPUT_LABEL;
  const {value, error} = useSelector(storeSelectors.getInput(inputLabel));

  const inputProps: InputProps = {
    placeholder: 'E-mail',
    value,
    error,
    updateValue: (newValue: string) => {
      authController.updateInputValue(newValue, inputLabel);
    },
  };

  return <Input {...inputProps} />;
}
