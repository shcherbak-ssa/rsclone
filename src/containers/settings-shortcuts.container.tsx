import React from 'react';
import { SettingsSectionMessageComponent, SettingsSectionMessageComponentProps } from '../components/settings-section-message.component';

import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { useAppLanguage } from '../hooks/app-language.hook';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';

export function SettingsShortcutsContainer() {
  const keyboardShortcuts = '';
  const appLanguage = useAppLanguage();

  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SHORTCUTS,
    controlDataLabels: [UserDataLabels.SHORTCUTS],
  };
  const settingsSectionMessageComponentProps: SettingsSectionMessageComponentProps = {
    message: appLanguage.settings.shortcuts.message,
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsSectionMessageComponent {...settingsSectionMessageComponentProps}/>
    </SettingsSectionComponent>
  );
}
