import React from 'react';

import { SelectThemeComponent, SelectThemeComponentProps } from '../components/select-theme.component';
import { UserDataLabels } from '../constants';
import { UserInputsEvents } from '../constants/events.constants';
import { themesData } from '../data/themes.data';
import { SelectPropsHookParameters, useSelectProps } from '../hooks/select-props.hook';

export type SelectThemeContainerProps = {
  initialItemLabel: string,
};

export function SelectThemeContainer({initialItemLabel}: SelectThemeContainerProps) {
  const selectPropsHookParameters: SelectPropsHookParameters = {
    initialItemLabel,
    items: themesData,
    dataLabel: UserDataLabels.THEME,
    userInputsEvent: UserInputsEvents.CHANGE_THEME,
  };

  const selectProps: SelectThemeComponentProps = useSelectProps(selectPropsHookParameters) as SelectThemeComponentProps;

  return (
    <SelectThemeComponent {...selectProps} />
  );
}