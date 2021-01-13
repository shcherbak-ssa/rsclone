import React from 'react';
import { Base, BaseSelectProps } from '../components/base';
import { SelectItemType } from '../components/base/select-item.component';
import { UserDataLabels } from '../constants';
import { languagesData } from '../data/languages.data';
import { SelectPropsHookParameters, useSelectProps } from '../hooks/select-props.hook';

export type SelectLanguageContainerProps = {
  initialState: SelectItemType,
};

export function SelectLanguageContainer({initialState}: SelectLanguageContainerProps) {
  const selectPropsHookParameters: SelectPropsHookParameters = {
    initialItem: initialState,
    items: languagesData,
    dataLabel: UserDataLabels.LANGUAGE,
  };

  const selectProps: BaseSelectProps = useSelectProps(selectPropsHookParameters);

  return (
    <Base.Select {...selectProps} />
  );
}
