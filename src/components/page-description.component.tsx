import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const MAX_DESCRIPTION_TEXTAREA_ROWS: number = 3;

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
    maxRows: MAX_DESCRIPTION_TEXTAREA_ROWS,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaValue(e.target.value);
    },
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
