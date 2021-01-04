import React from 'react';
import './settings-login.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';

export function SettingsLogin() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: false,
    title: 'Login',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}></SettingsSection>
  );
}
