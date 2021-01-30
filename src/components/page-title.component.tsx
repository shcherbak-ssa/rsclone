import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type PageTitleComponentProps = {
  pageTitle: string,
};

export function PageTitleComponent({
  pageTitle,
}: PageTitleComponentProps) {
  const [textareaValue, setTextareaValue] = useState(pageTitle);

  const textareaProps = {
    className: 'page-title',
    value: textareaValue,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
