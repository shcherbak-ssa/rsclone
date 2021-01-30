import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import { MAX_PAGE_DESCRIPTION_LENGTH } from '../../common/validation';
import { UserDataLabels } from '../constants';
import { PageHeaderTextareaHookParams, usePageHeaderTextareaProps } from '../hooks/page-header-textarea-props.hook';

const MAX_DESCRIPTION_TEXTAREA_ROWS: number = 3;

export type PageDescriptionComponentProps = {
  activePageID: string,
  pageDescription: string,
  placeholder: string,
};

export function PageDescriptionComponent({
  activePageID, pageDescription, placeholder,
}: PageDescriptionComponentProps) {
  const pageHeaderTextareaPropsHookParams: PageHeaderTextareaHookParams = {
    initialValue: pageDescription,
    limitValueLength: MAX_PAGE_DESCRIPTION_LENGTH,
    placeholder,
    dataLabel: UserDataLabels.PAGE_DESCRIPTION,
    activePageID,
  };

  const textareaHookProps = usePageHeaderTextareaProps(pageHeaderTextareaPropsHookParams);

  const textareaProps = {
    className: 'page-description',
    maxRows: MAX_DESCRIPTION_TEXTAREA_ROWS,
    ...textareaHookProps,
  };
  
  return <TextareaAutosize {...textareaProps}/>;
}
