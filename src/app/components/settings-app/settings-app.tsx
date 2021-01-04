import React from 'react';
import './settings-app.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';

export function SettingsApp() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: false,
    title: 'App',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}></SettingsSection>
  );
}
