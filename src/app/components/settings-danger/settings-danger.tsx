import React from 'react';
import './settings-danger.scss';

import { ButtonTypes } from '../../constants';
import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';

export function SettingsDanger() {
  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Danger Zone',
  };

  const settingsActionProps: SettingsActionProps = {
    title: 'Delete account',
    description: `By deleting your personal account, you delete all associated data. Think before acting, there's no turning back!`,
    buttonProps: {
      type: ButtonTypes.DANGER,
      value: 'Delete',
      clickHandler: () => {},
    },
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <SettingsAction {...settingsActionProps} />
    </SettingsSection>
  );
}
