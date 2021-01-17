import React from 'react';

import { ShortcurtsSections } from '../../common/constants';
import { KeyboardShortcut } from '../../common/entities';
import { SettingsGroupComponent, SettingsGroupComponentProps } from '../components/settings-group.component';
import { SettingsGroupLabels, SettingsSectionLabels } from '../constants';
import { SettingsGroupPropsHookParams, useSettingsGroupProps } from '../hooks/settings-group-props.hook';
import { ShortcutsService } from '../services/shortcuts.service';
import { ShortcutContainer, ShortcutContainerProps } from './shortcut.container';

export type ShortcutGroupContainerProps = {
  groupLabel: SettingsGroupLabels,
  keyboardShortcuts: KeyboardShortcut[],
  selectedShortcutLabel: string | null,
  updateSelectedShortcut: Function,
};

export function ShortcutGroupContainer({
  groupLabel, keyboardShortcuts, selectedShortcutLabel, updateSelectedShortcut,
}: ShortcutGroupContainerProps) {
  const settingsGroupPropsHookParams: SettingsGroupPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SHORTCUTS,
    groupLabel,
  };

  const settingsGroupComponentProps: SettingsGroupComponentProps
    = useSettingsGroupProps(settingsGroupPropsHookParams);

  function getCurrentSectionShortcuts() {
    return ShortcutsService
      .getSectionShortcuts(groupLabel, keyboardShortcuts)
      .map((keyboardShortcut, index) => {
        const shortcutProps: ShortcutContainerProps = {
          keyboardShortcut,
          selectedShortcutLabel,
          updateSelectedShortcut,
        };

        return <ShortcutContainer key={index} {...shortcutProps} />;
      });
  }

  return (
    <SettingsGroupComponent {...settingsGroupComponentProps}>
      {getCurrentSectionShortcuts()}
    </SettingsGroupComponent>
  );
}
