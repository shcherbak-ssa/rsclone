import React from 'react';
import './settings-danger.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';

export function SettingsDanger() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: false,
    title: 'Danger Zone',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}></SettingsSection>
  );
}
