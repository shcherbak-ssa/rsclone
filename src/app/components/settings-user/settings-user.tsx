import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-user.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group';
import { SettingsAvatar } from '../settings-avatar';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';

export function SettingsUser() {
  const {name, username} = useSelector(storeSelectors.user.get());
  const [nameValue, setNameValue] = useState(name);
  const [usernameValue, setUsernameValue] = useState(username);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'User',
    unsavedDataExist: false,
    saveButtonClickHanlder: () => {},
  };

  const settingsGroupProps: SettingsGroupProps = {
    title: 'User data',
  };

  const nameInputProps: BaseInputProps = {
    value: nameValue,
    placeholder: 'Your name',
    error: '',
    updateValue: (value: string) => {
      setNameValue(value);
    },
  };

  const usernameInputProps: BaseInputProps = {
    value: usernameValue,
    placeholder: 'Username',
    error: '',
    description: 'Your username is used as prefix for your personal spaces',
    updateValue: (value: string) => {
      setUsernameValue(value);
    },
  };

  return (
    <SettingsSection {...settingsSectionProps}>
      <SettingsAvatar />
      <SettingsGroup {...settingsGroupProps}>
        <Base.Input {...nameInputProps} />
        <Base.Input {...usernameInputProps} />
      </SettingsGroup>
    </SettingsSection>
  );
}
