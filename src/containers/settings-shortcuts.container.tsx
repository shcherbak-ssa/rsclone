import React, { useState } from 'react';

import { SettingsSectionMessageComponent, SettingsSectionMessageComponentProps } from '../components/settings-section-message.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { useAppLanguage } from '../hooks/app-language.hook';
import { useUserState } from '../hooks/user-state.hook';
import { shortcutsGroups } from '../data/shortcuts.data';
import { ShortcutGroupContainer, ShortcutGroupContainerProps } from './shortcut-group.container';

export function SettingsShortcutsContainer() {
  const keyboardShortcuts = useUserState(UserDataLabels.SHORTCUTS);
  const [selectedShortcutLabel, setSelectedShortcutLabel] = useState(null);
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

  function drawShortcutGroups() {
    return shortcutsGroups.map((groupLabel, index) => {
      const shortcutGroupContainerProps: ShortcutGroupContainerProps = {
        groupLabel,
        keyboardShortcuts,
        selectedShortcutLabel,
        updateSelectedShortcut,
      };

      return <ShortcutGroupContainer key={index} {...shortcutGroupContainerProps} />;
    });
  }

  function updateSelectedShortcut(nextSelectedShortcutLabel: string | null) {
    setSelectedShortcutLabel(nextSelectedShortcutLabel);
  }

  return (
    <SettingsSectionComponent {...settingsSectionComponentProps}>
      <SettingsSectionMessageComponent {...settingsSectionMessageComponentProps}/>
      {drawShortcutGroups()}
    </SettingsSectionComponent>
  );
}
