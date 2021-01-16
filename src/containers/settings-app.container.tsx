import React from 'react';
import { useSelector } from 'react-redux';

import { UserInputsEvents } from '../constants/events.constants';
import { SettingsGroupLabels, SettingsSectionLabels, Stores, UserDataLabels } from '../constants';
import { Base, BaseSelectProps } from '../components/base';
import { SelectPropsHookParameters, useSelectProps } from '../hooks/select-props.hook';
import { SelectThemeComponent, SelectThemeComponentProps } from '../components/select-theme.component';
import { languagesData } from '../data/languages.data';
import { themesData } from '../data/themes.data';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsGroupPropsHookParams, useSettingsGroupProps } from '../hooks/settings-group-props.hook';
import { storeSelectorsService } from '../services/store-selectors.service';

export function SettingsAppContainer() {
  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const currentLanguage = useSelector(userStoreSelectors.getState(UserDataLabels.LANGUAGE));
  const currentTheme = useSelector(userStoreSelectors.getState(UserDataLabels.THEME));

  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.APP
  };
  const settingsGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.APP,
    groupLabel: SettingsGroupLabels.THEME,
  };
  const selectPropsHookParametersForLanguage: SelectPropsHookParameters = {
    initialItemLabel: currentLanguage,
    items: languagesData,
    dataLabel: UserDataLabels.LANGUAGE,
    userInputsEvent: UserInputsEvents.CHANGE_LANGUAGE,
  };
  const selectPropsHookParametersForTheme: SelectPropsHookParameters = {
    initialItemLabel: currentTheme,
    items: themesData,
    dataLabel: UserDataLabels.THEME,
    userInputsEvent: UserInputsEvents.CHANGE_THEME,
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);
  const settingsGroupComponentProps: SettingsGroupComponentProps
    = useSettingsGroupProps(settingsGroupPropsHookParams);
  const languageSelectProps
    = useSelectProps(selectPropsHookParametersForLanguage) as BaseSelectProps;
  const themeSelectProps
    = useSelectProps(selectPropsHookParametersForTheme) as SelectThemeComponentProps;

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <Base.Select {...languageSelectProps} />
      <SettingsGroupComponent {...settingsGroupComponentProps}>
        <SelectThemeComponent {...themeSelectProps} />
      </SettingsGroupComponent>
    </SettingsSectionComponent>
  );
}
