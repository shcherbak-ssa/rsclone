import React from 'react';
import './settings-user.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAvatar } from '../settings-avatar/settings-avatar';

export function SettingsUser() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'User',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <SettingsAvatar />
    </SettingsSection>
  );
}
