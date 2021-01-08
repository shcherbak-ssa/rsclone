import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-shortcuts.scss';

import { shortcutsSectionsLabels } from '../../../../core/constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { storeSelectors } from '../../store';
import { ShortcutGroup, ShortcutGroupProps } from '../shortcut-group';

export function SettingsShortcuts() {
  const { keyboardShortcuts } = useSelector(storeSelectors.user.get());
  const [selectedShortcutLabel, setSelectedShortcutLabel] = useState(null);

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

  function updateSelectedShortcut(nextSelectedShortcutLabel: string | null) {
    setSelectedShortcutLabel(nextSelectedShortcutLabel);
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <div className="settings-shortcuts-message">Select any shortcut and press your combination</div>
      {getShortcutGroups()}
    </SettingsSection>
  );
}
