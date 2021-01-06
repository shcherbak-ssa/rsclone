import React, { useState } from 'react';
import { InputLabels } from '../../constants';
import { Input, InputProps } from '../containers/input';
import { authController } from '../controllers/auth.controller';

const VIEW_ICON: string = 'view';

export function InputPassword() {
  const inputLabel = InputLabels.PASSWORD_INPUT_LABEL;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const inputProps: InputProps = {
    placeholder: 'Password',
    inputLabel,
    icon: VIEW_ICON,
    iconClickHandle: () => {
      setIsPasswordVisible(!isPasswordVisible);
    },
    updateValue: (oldValue: string, newValue: string) => {
      if (!isPasswordVisible) {
        newValue = removeDots(oldValue, newValue);
      }

      authController.updateInputValue(newValue, inputLabel);
    },
    transformValue,
  };

  function transformValue(value: string) {
    return isPasswordVisible ? value : value.replace(/[^\n]/ig, '●');
  }

  function removeDots(oldValue: string, newValue: string) {
    const splitedValue = oldValue.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  return <Input {...inputProps} />;
}
