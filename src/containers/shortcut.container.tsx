import React from 'react';

import { KeyboardShortcut } from '../../common/entities';
import { SettingsActionComponent, SettingsActionComponentProps } from '../components/settings-action.component';
import { SettingsActionLabels, SettingsSectionLabels } from '../constants';
import { SettingsActionPropsHookParams, useSettingsActionProps } from '../hooks/settings-action-props.hook';
import { ShortcutsService } from '../services/shortcuts.service';

export type ShortcutContainerProps = {
  keyboardShortcut: KeyboardShortcut,
  selectedShortcutLabel: string | null,
  updateSelectedShortcut: Function,
};

export function ShortcutContainer({
  keyboardShortcut: {label, keys},
  selectedShortcutLabel,
  updateSelectedShortcut,
}: ShortcutContainerProps) {
  const isSelected = label === selectedShortcutLabel;
  const settingsActionPropsHookParams: SettingsActionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SHORTCUTS,
    actionLabel: label as SettingsActionLabels,
    buttonProps: {
      value: ShortcutsService.transformShortcutKeys(keys),
      clickHandler: () => {},
    },
    selectAction: {
      isSelected,
      toggleSelection: () => {
        updateSelectedShortcut(isSelected ? null : label);
      },
    },
  };

  const settingsActionComponentProps: SettingsActionComponentProps
    = useSettingsActionProps(settingsActionPropsHookParams);

  return <SettingsActionComponent {...settingsActionComponentProps}/>;
}
