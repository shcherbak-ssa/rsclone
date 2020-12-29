import React, { useState } from 'react';
import { Input, InputProps } from '../input';

const VIEW_ICON: string = 'view';

export function InputPassword() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
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
      if (isPasswordVisible) {
        setValue(newValue);
      } else {
        const transformedValue = removeDots(newValue);
        setValue(transformedValue);
      }

      if (error) {
        setError('');
      }
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
