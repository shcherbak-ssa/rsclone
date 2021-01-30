import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export type PageTitleComponentProps = {
  pageTitle: string,
  placeholder: string,
};

export function PageTitleComponent({
  pageTitle, placeholder,
}: PageTitleComponentProps) {
  const [textareaValue, setTextareaValue] = useState(pageTitle);

  useEffect(() => {
    setTextareaValue(pageTitle);
  }, [pageTitle]);

  const textareaProps = {
    className: 'page-title',
    value: textareaValue,
    placeholder,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
