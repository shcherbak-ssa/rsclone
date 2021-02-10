import React, { useEffect, useState } from 'react';

import { SettingsSectionMessageComponent, SettingsSectionMessageComponentProps } from '../components/settings-section-message.component';
import { SettingsSectionComponent, SettingsSectionComponentProps } from '../components/settings-section.component';
import { SettingsSectionLabels, UserDataLabels } from '../constants';
import { SettingsSectionPropsHookParams, useSettingsSectionProps } from '../hooks/settings-section-props.hook';
import { useAppLanguage } from '../hooks/app-language.hook';
import { shortcutsGroups } from '../data/shortcuts.data';
import { ShortcutGroupContainer, ShortcutGroupContainerProps } from './shortcut-group.container';
import { ShortcutsService } from '../services/shortcuts.service';
import { useUserDraftState } from '../hooks/user-draft-state.hook';
import { EMPTY_SHORTCUT_STRING } from '../constants/strings.constants';

export function SettingsShortcutsContainer() {
  const appLanguage = useAppLanguage();
  const draftKeyboardShorcuts = useUserDraftState(UserDataLabels.SHORTCUTS);

  const [selectedShortcutLabel, setSelectedShortcutLabel] = useState(null);
  const [pressedKeyboardKeys, setPressedKeyboardKeys] = useState('');

  const settingsSectionPropsHookParams: SettingsSectionPropsHookParams = {
    sectionLabel: SettingsSectionLabels.SHORTCUTS,
    controlDataLabels: [UserDataLabels.SHORTCUTS],
  };
  const settingsSectionMessageComponentProps: SettingsSectionMessageComponentProps = {
    message: appLanguage.settings.shortcuts.message,
  };

  const settingsSectionComponentProps: SettingsSectionComponentProps
    = useSettingsSectionProps(settingsSectionPropsHookParams);

  useEffect(() => {
    const shortcutsService: ShortcutsService = new ShortcutsService(setPressedKeyboardKeys);
    shortcutsService.initEvents();
    
    return () => {
      shortcutsService.removeEvents();
    };
  }, []);

  useEffect(() => {
    if (selectedShortcutLabel !== null) {
      updateKeyboardShortcuts();
      updateSelectedShortcut(null);
      setPressedKeyboardKeys('');
    }
  }, [pressedKeyboardKeys]);

  function updateKeyboardShortcuts() {
    const selectedKeyboardShortcut = draftKeyboardShorcuts.find((keyboardShortcut) => {
      return keyboardShortcut.label === selectedShortcutLabel;
    });

    draftKeyboardShorcuts.forEach((draftKeyboardShortcut) => {
      if (draftKeyboardShortcut === selectedKeyboardShortcut) return;

      if (draftKeyboardShortcut.section === selectedKeyboardShortcut.section) {
        if (draftKeyboardShortcut.keys === pressedKeyboardKeys) {
          draftKeyboardShortcut.keys = EMPTY_SHORTCUT_STRING;
        }
      }
    });
    
    selectedKeyboardShortcut.keys = pressedKeyboardKeys;
  }

  function drawShortcutGroups() {
    return shortcutsGroups.map((groupLabel, index) => {
      const shortcutGroupContainerProps: ShortcutGroupContainerProps = {
        groupLabel,
        keyboardShortcuts: draftKeyboardShorcuts,
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
