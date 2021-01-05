import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-login.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';

export function SettingsLogin() {
  const {email} = useSelector(storeSelectors.user.get());
  const [emailValue, setEmailValue] = useState(email);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Login',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  const emailInputProps: BaseInputProps = {
    value: emailValue,
    placeholder: 'E-mail',
    error: '',
    updateValue: (value: string) => {
      setEmailValue(value);
    },
  };

  const settingsActionProps: SettingsActionProps = {
    title: 'Password',
    description: 'Secure your GitBook Clone account with a strong and unique password',
    buttonProps: {
      value: 'Change password',
      clickHandler: () => {},
    },
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Input {...emailInputProps} />
      <SettingsAction {...settingsActionProps} />
    </SettingsSection>
  );
}
