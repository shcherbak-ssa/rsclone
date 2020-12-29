import React, { useState } from 'react';
import { Input, InputProps } from '../input';

export function InputEmail() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const inputProps: InputProps = {
    placeholder: 'E-mail',
    value,
    error,
    updateValue: (newValue: string) => {
      setValue(newValue);

      if (error) {
        setError('');
      }
    },
  };

  return <Input {...inputProps} />;
}
