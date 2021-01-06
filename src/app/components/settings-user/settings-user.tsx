import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-user.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group';
import { SettingsAvatar } from '../settings-avatar';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';
import { UpdatedUserType } from '../../models/settings.model';
import { ValidationError } from '../../../services/validation.service';
import { InputLabels } from '../../../constants';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';

export function SettingsUser() {
  const {name, username} = useSelector(storeSelectors.user.get());
  const [nameValue, setNameValue] = useState(name);
  const [nameError, setNameError] = useState('');
  const [usernameValue, setUsernameValue] = useState(username);
  const [usernameError, setUsernameError] = useState('');
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'User',
    unsavedDataExist,
    saveButtonClickHanlder: () => {
      const updatedUser: UpdatedUserType = {
        newName: nameValue === name ? undefined : nameValue,
        newUsername: usernameValue === username ? undefined : usernameValue,
        callback: (result) => {
          if (result instanceof ValidationError) {
            const {message, payload} = result;
            updateError(message, payload.inputLabel);
          } else {
            setUnsavedDataExist(false);
          }
        }
      };

      settingsController.emit(SettingsEvents.UPDATE_USER, updatedUser);
    },
  };

  const settingsGroupProps: SettingsGroupProps = {
    title: 'User data',
  };

  const nameInputProps: BaseInputProps = {
    value: nameValue,
    placeholder: 'Your name',
    error: nameError,
    updateValue: (value: string) => {
      setNameValue(value);
      setUnsavedDataExist(value !== name || usernameValue !== username);

      if (nameError) {
        setNameError('');
      }
    },
  };

  const usernameInputProps: BaseInputProps = {
    value: usernameValue,
    placeholder: 'Username',
    error: usernameError,
    description: 'Your username is used as prefix for your personal spaces',
    updateValue: (value: string) => {
      setUsernameValue(value);
      setUnsavedDataExist(value !== username || nameValue !== name);

      if (usernameError) {
        setUsernameError('');
      }
    },
  };

  function updateError(message: string, inputLabel: InputLabels) {
    switch (inputLabel) {
      case InputLabels.NAME_INPUT_LABEL:
        setNameError(message);
        break;
      case InputLabels.USERNAME_INPUT_LABEL:
        setUsernameError(message);
        break;
    }
  }

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
