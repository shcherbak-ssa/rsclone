import React from 'react';

import { KeyboardShortcutType } from '../../../core/types';
import { ShortcutsService } from '../../services/shortcuts.service';
import { SettingsGroupProps, SettingsGroup } from '../containers/settings-group';
import { Shortcut, ShortcutProps } from './shortcut';

export type ShortcutGroupProps = {
  sectionLabel: string,
  keyboardShortcuts: Array<KeyboardShortcutType>,
  selectedItemLabel: string | null,
  toggleSelection: Function,
};

export function ShortcutGroup({
  sectionLabel, keyboardShortcuts, selectedItemLabel, toggleSelection,
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
          selectedItemLabel,
          toggleSelection,
        };

        return <Shortcut key={index} {...shortcutProps} />
      });
  }

  return (
    <SettingsGroup {...settingsGroupProps}>
      {getCurrentSectionShortcuts()}
    </SettingsGroup>
  );
}
