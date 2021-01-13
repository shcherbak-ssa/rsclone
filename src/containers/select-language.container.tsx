import React from 'react';
import { Base, BaseSelectProps } from '../components/base';
import { UserDataLabels } from '../constants';
import { UserInputsEvents } from '../constants/events.constants';
import { languagesData } from '../data/languages.data';
import { SelectPropsHookParameters, useSelectProps } from '../hooks/select-props.hook';

export type SelectLanguageContainerProps = {
  initialItemLabel: string,
};

export function SelectLanguageContainer({initialItemLabel}: SelectLanguageContainerProps) {
  const selectPropsHookParameters: SelectPropsHookParameters = {
    initialItemLabel,
    items: languagesData,
    dataLabel: UserDataLabels.LANGUAGE,
    userInputsEvent: UserInputsEvents.CHANGE_LANGUAGE,
  };

  const selectProps: BaseSelectProps = useSelectProps(selectPropsHookParameters);

  return (
    <Base.Select {...selectProps} />
  );
}
