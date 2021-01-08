import React from 'react';
import './settings-shortcuts.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';

export function SettingsShortcuts() {
  const settingsSectionProps: SettingsSectionProps = {
    title: 'Keyboard Shortcuts',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}></SettingsSection>
  );
}
