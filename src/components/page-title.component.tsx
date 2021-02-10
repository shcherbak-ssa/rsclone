import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MAX_PAGE_TITLE_LENGTH } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { PageHeaderTextareaHookParams, usePageHeaderTextareaProps } from '../hooks/page-header-textarea-props.hook';

export type PageTitleComponentProps = {
  activePageID: string,
  pageTitle: string,
  placeholder: string,
  newPageTitle: string,
};

export function PageTitleComponent({
  activePageID, pageTitle, placeholder, newPageTitle,
}: PageTitleComponentProps) {
  const pageHeaderTextareaPropsHookParams: PageHeaderTextareaHookParams = {
    initialValue: pageTitle,
    limitValueLength: MAX_PAGE_TITLE_LENGTH,
    placeholder,
    dataLabel: UserDataLabels.PAGE_TITLE,
    activePageID,
    newPageTitle,
  };

  const textareaHookProps = usePageHeaderTextareaProps(pageHeaderTextareaPropsHookParams);

  const textareaProps = {
    className: 'page-title',
    ...textareaHookProps,
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
