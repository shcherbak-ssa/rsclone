import React from 'react';

import { KeyboardShortcutType } from '../../../core/types';
import { ShortcutsService } from '../../services/shortcuts.service';
import { SettingsGroupProps, SettingsGroup } from '../containers/settings-group';
import { Shortcut, ShortcutProps } from './shortcut';

export type ShortcutGroupProps = {
  sectionLabel: string,
  keyboardShortcuts: Array<KeyboardShortcutType>,
  selectedShortcutLabel: string | null,
  updateSelectedShortcut: Function,
};

export function ShortcutGroup({
  sectionLabel, keyboardShortcuts, selectedShortcutLabel, updateSelectedShortcut,
}: ShortcutGroupProps) {
  const settingsGroupProps: SettingsGroupProps = {
    title: sectionLabel,
  };

  function getCurrentSectionShortcuts() {
    return ShortcutsService
      .getSectionShortcuts(sectionLabel, keyboardShortcuts)
      .map((keyboardShortcut, index) => {
        const shortcutProps: ShortcutProps = {
          keyboardShortcut,
          selectedShortcutLabel,
          updateSelectedShortcut,
        };

        return <Shortcut key={index} {...shortcutProps} />;
      });
  }

  return (
    <SettingsGroup {...settingsGroupProps}>
      {getCurrentSectionShortcuts()}
    </SettingsGroup>
  );
}
