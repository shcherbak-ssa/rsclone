import React from 'react';

import { UserInputsEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { Base, BaseSelectProps } from '../components/base';
import { SelectPropsHookParameters, useSelectProps } from '../hooks/select-props.hook';
import { SelectThemeComponent, SelectThemeComponentProps } from '../components/select-theme.component';
import { languagesData } from '../data/languages.data';
import { themesData } from '../data/themes.data';
import { SettingsGroupComponent } from '../components/settings-group.component';

export type SettingsAppContainerProps = {
  settingsGroupTitle: string,
  currentLanguageState: string,
  currentThemeState: string,
};

export function SettingsAppContainer({
  settingsGroupTitle, currentLanguageState, currentThemeState
}: SettingsAppContainerProps) {
  const selectPropsHookParametersForLanguage: SelectPropsHookParameters = {
    initialItemLabel: currentLanguageState,
    items: languagesData,
    dataLabel: UserDataLabels.LANGUAGE,
    userInputsEvent: UserInputsEvents.CHANGE_LANGUAGE,
  };

  const selectPropsHookParametersForTheme: SelectPropsHookParameters = {
    initialItemLabel: currentThemeState,
    items: themesData,
    dataLabel: UserDataLabels.THEME,
    userInputsEvent: UserInputsEvents.CHANGE_THEME,
  };

  const languageSelectProps: BaseSelectProps
    = useSelectProps(selectPropsHookParametersForLanguage) as BaseSelectProps;
  const themeSelectProps: SelectThemeComponentProps
    = useSelectProps(selectPropsHookParametersForTheme) as SelectThemeComponentProps;

  return (
    <>
      <Base.Select {...languageSelectProps} />
      <SettingsGroupComponent title={settingsGroupTitle}>
        <SelectThemeComponent {...themeSelectProps} />
      </SettingsGroupComponent>
    </>
  );
}
