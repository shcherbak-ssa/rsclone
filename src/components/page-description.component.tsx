import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type PageDescriptionComponentProps = {
  pageDescription: string,
  placeholder: string,
};

export function PageDescriptionComponent({
  pageDescription, placeholder,
}: PageDescriptionComponentProps) {
  const [textareaValue, setTextareaValue] = useState(pageDescription);

  useEffect(() => {
    setTextareaValue(pageDescription);
  }, [pageDescription]);

  const textareaProps = {
    className: 'page-description',
    value: textareaValue,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
