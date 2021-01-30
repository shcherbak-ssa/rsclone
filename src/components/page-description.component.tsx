import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MAX_PAGE_DESCRIPTION_LENGTH } from '../../common/validation';
import { PageHeaderTextareaHookParams, usePageHeaderTextareaProps } from '../hooks/page-header-textarea-props.hook';

const MAX_DESCRIPTION_TEXTAREA_ROWS: number = 3;

export type PageDescriptionComponentProps = {
  pageDescription: string,
  placeholder: string,
};

export function PageDescriptionComponent({
  pageDescription, placeholder,
}: PageDescriptionComponentProps) {
  const pageHeaderTextareaPropsHookParams: PageHeaderTextareaHookParams = {
    initialValue: pageDescription,
    limitValueLength: MAX_PAGE_DESCRIPTION_LENGTH,
    placeholder,
  };

  const textareaHookProps = usePageHeaderTextareaProps(pageHeaderTextareaPropsHookParams);

  const textareaProps = {
    className: 'page-description',
    maxRows: MAX_DESCRIPTION_TEXTAREA_ROWS,
    ...textareaHookProps,
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
