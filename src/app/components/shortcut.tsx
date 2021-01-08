import React from 'react';

import { KeyboardShortcutType } from '../../../core/types';
import { ShortcutsService } from '../../services/shortcuts.service';
import { SettingsActionProps, SettingsAction } from '../containers/settings-action';

export type ShortcutProps = {
  keyboardShortcut: KeyboardShortcutType,
  selectedShortcutLabel: string | null,
  updateSelectedShortcut: Function,
};

export function Shortcut({
  keyboardShortcut: {title, description, label, keys},
  selectedShortcutLabel,
  updateSelectedShortcut,
}: ShortcutProps) {
  const isSelected = label === selectedShortcutLabel;
  const settingsActionProps: SettingsActionProps = {
    title,
    description,
    buttonProps: {
      value: ShortcutsService.transformShortcutKeys(keys),
      clickHandler: () => {},
    },
    isSelectType: true,
    isSelected,
    toggleSelection: () => {
      updateSelectedShortcut(isSelected ? null : label);
    },
  };

  return <SettingsAction {...settingsActionProps} />
}
