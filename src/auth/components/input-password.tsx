import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { InputLabels } from '../constants';
import { Input, InputProps } from '../containers/input';
import { authController } from '../controllers/auth.controller';
import { storeSelectors } from '../store';

const VIEW_ICON: string = 'view';

export function InputPassword() {
  const inputLabel = InputLabels.PASSWORD_INPUT_LABEL;
  const {value, error} = useSelector(storeSelectors.getInput(inputLabel));
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputProps: InputProps = {
    placeholder: 'Password',
    value: transformValue(),
    error,
    icon: VIEW_ICON,
    iconClickHandle: () => {
      setIsPasswordVisible(!isPasswordVisible);
    },
    updateValue: (newValue: string) => {
      if (!isPasswordVisible) {
        newValue = removeDots(newValue);
      }

      authController.updateInputValue(newValue, inputLabel);
    },
  };

  function transformValue() {
    return isPasswordVisible ? value : value.replace(/[^\n]/ig, '●');
  }

  function removeDots(newValue: string) {
    const splitedValue = value.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  return <Input {...inputProps} />;
}
