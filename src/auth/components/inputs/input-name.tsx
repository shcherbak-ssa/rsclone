import React, { useState } from 'react';
import { Input, InputProps } from '../input';

export function InputName() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const inputProps: InputProps = {
    placeholder: 'Your name',
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
