import React from 'react';

import { KeyboardShortcutType } from '../../../core/types';
import { ShortcutsService } from '../../services/shortcuts.service';
import { SettingsActionProps, SettingsAction } from '../containers/settings-action';

export type ShortcutProps = {
  keyboardShortcut: KeyboardShortcutType,
  isSelected: boolean,
  toggleSelection: Function,
};

export function Shortcut({
  keyboardShortcut: {title, description, label, keys},
  isSelected,
  toggleSelection,
}: ShortcutProps) {
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
