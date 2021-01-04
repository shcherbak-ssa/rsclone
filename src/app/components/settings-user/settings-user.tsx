import React from 'react';
import './settings-user.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';

export function SettingsUser() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: false,
    title: 'User',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}></SettingsSection>
  );
}
