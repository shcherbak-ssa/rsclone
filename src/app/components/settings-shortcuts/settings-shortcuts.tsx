import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-shortcuts.scss';

import { shortcutsSectionsLabels } from '../../../../core/constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { storeSelectors } from '../../store';
import { ShortcutGroup, ShortcutGroupProps } from '../shortcut-group';
import { ShortcutsService } from '../../../services/shortcuts.service';

export function SettingsShortcuts() {
  const user = useSelector(storeSelectors.user.get());
  const [keyboardShortcuts] = useState(user.keyboardShortcuts);
  const [selectedShortcutLabel, setSelectedShortcutLabel] = useState(null);
  const [pressedKeyboardKeys, setPressedKeyboardKeys] = useState('');

  const settingsSectionProps: SettingsSectionProps = {
    title: 'Keyboard Shortcuts',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  function getShortcutGroups() {
    return shortcutsSectionsLabels.map((sectionLabel, index) => {
      const shortcutGroupProps: ShortcutGroupProps = {
        sectionLabel,
        keyboardShortcuts,
        selectedShortcutLabel,
        updateSelectedShortcut,
      };

      return <ShortcutGroup key={index} {...shortcutGroupProps} />;
    });
  }

  useEffect(() => {
    const shortcutsService = new ShortcutsService(setPressedKeyboardKeys);
    shortcutsService.initEvents();
    
    return () => {
      shortcutsService.removeEvents();
    };
  }, []);

  useEffect(() => {
    if (selectedShortcutLabel !== null) {
      console.log(pressedKeyboardKeys);
      updateKeyboardShortcuts();
      updateSelectedShortcut(null);
      setPressedKeyboardKeys('');
    }
  }, [pressedKeyboardKeys]);

  function updateSelectedShortcut(nextSelectedShortcutLabel: string | null) {
    setSelectedShortcutLabel(nextSelectedShortcutLabel);
  }

  function updateKeyboardShortcuts() {
    const selectedKeyboardShortcut = keyboardShortcuts.find((keyboardShortcut) => {
      return keyboardShortcut.label === selectedShortcutLabel;
    });

    keyboardShortcuts.forEach((keyboardShortcut) => {
      if (keyboardShortcut === selectedKeyboardShortcut) return;

      if (keyboardShortcut.section === selectedKeyboardShortcut.section) {
        if (keyboardShortcut.keys === pressedKeyboardKeys) {
          keyboardShortcut.keys = '???';
        }
      }
    });
    
    selectedKeyboardShortcut.keys = pressedKeyboardKeys;
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <div className="settings-shortcuts-message">Select any shortcut and press your combination</div>
      {getShortcutGroups()}
    </SettingsSection>
  );
}
