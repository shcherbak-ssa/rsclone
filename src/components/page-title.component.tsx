import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MAX_PAGE_TITLE_LENGTH } from '../../common/validation';
import { PageHeaderTextareaHookParams, usePageHeaderTextareaProps } from '../hooks/page-header-textarea-props.hook';

export type PageTitleComponentProps = {
  pageTitle: string,
  placeholder: string,
};

export function PageTitleComponent({
  pageTitle, placeholder,
}: PageTitleComponentProps) {
  const pageHeaderTextareaPropsHookParams: PageHeaderTextareaHookParams = {
    initialValue: pageTitle,
    limitValueLength: MAX_PAGE_TITLE_LENGTH,
    placeholder,
  };

  const textareaHookProps = usePageHeaderTextareaProps(pageHeaderTextareaPropsHookParams);

  const textareaProps = {
    className: 'page-title',
    ...textareaHookProps,
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
