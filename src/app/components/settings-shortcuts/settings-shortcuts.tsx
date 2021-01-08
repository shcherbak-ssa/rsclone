import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cloneDeep from 'clone-deep';
import './settings-shortcuts.scss';

import { shortcutsSectionsLabels } from '../../../../core/constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { storeSelectors } from '../../store';
import { ShortcutGroup, ShortcutGroupProps } from '../shortcut-group';
import { ShortcutsService } from '../../../services/shortcuts.service';
import { SettingsShortcutsType } from '../../models/settings-shortcuts.model';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';

export function SettingsShortcuts() {
  const {keyboardShortcuts: userKeyboardShortcuts} = useSelector(storeSelectors.user.get());
  const [keyboardShortcuts] = useState(cloneDeep(userKeyboardShortcuts));
  const [selectedShortcutLabel, setSelectedShortcutLabel] = useState(null);
  const [pressedKeyboardKeys, setPressedKeyboardKeys] = useState('');
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    title: 'Keyboard Shortcuts',
    unsavedDataExist,
    saveButtonClickHanlder: () => {
      const updatedShortcuts: SettingsShortcutsType = {
        keyboardShortcuts,
        successCallback: () => {
          setUnsavedDataExist(false);
        },
      };

      settingsController.emit(SettingsEvents.UPDATE_SHORTCUTS, updatedShortcuts);
    },
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
      updateKeyboardShortcuts();
      updateSelectedShortcut(null);
      setPressedKeyboardKeys('');
      updateUnsavedDataExist();
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

  function updateUnsavedDataExist() {
    const changedKeyboardShortcut = keyboardShortcuts.find((keyboardShortcut, index) => {
      return keyboardShortcut.keys !== userKeyboardShortcuts[index].keys;
    });

    setUnsavedDataExist(!!changedKeyboardShortcut);
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <div className="settings-shortcuts-message">
        Select any shortcut and press your combination
      </div>
      {getShortcutGroups()}
    </SettingsSection>
  );
}
