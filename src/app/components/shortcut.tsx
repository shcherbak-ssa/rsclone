import React from 'react';

import { KeyboardShortcutType } from '../../../core/types';
import { ShortcutsService } from '../../services/shortcuts.service';
import { SettingsActionProps, SettingsAction } from '../containers/settings-action';

export type ShortcutProps = {
  keyboardShortcut: KeyboardShortcutType,
  selectedItemLabel: string | null,
  toggleSelection: Function,
};

export function Shortcut({
  keyboardShortcut: {title, description, label, keys},
  selectedItemLabel,
  toggleSelection,
}: ShortcutProps) {
  const isSelected = label === selectedItemLabel;
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
      toggleSelection(isSelected ? null : label);
    },
  };

  return <SettingsAction {...settingsActionProps} />
}
