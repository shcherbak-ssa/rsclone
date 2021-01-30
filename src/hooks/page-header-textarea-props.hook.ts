import React, { useEffect, useState } from 'react';

export type PageHeaderTextareaHookParams = {
  initialValue: string,
  limitValueLength: number,
  placeholder: string,
};

export function usePageHeaderTextareaProps({
  initialValue, limitValueLength, placeholder,
}: PageHeaderTextareaHookParams): any {
  const [textareaValue, setTextareaValue] = useState(initialValue);

  useEffect(() => {
    setTextareaValue(initialValue);
  }, [initialValue]);

  const textareaProps = {
    placeholder,
    value: textareaValue,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const {value} = e.target;

      if (value.length <= limitValueLength) {
        setTextareaValue(value);
      }
    },
    onBlur: () => {},
  };

  return textareaProps;
}
