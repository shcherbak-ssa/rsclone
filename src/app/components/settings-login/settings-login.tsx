import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-login.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
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
    updateValue: (value: string) => {},
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Input {...emailInputProps} />
    </SettingsSection>
  );
}
