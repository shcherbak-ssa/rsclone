import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-user.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsGroup, SettingsGroupProps } from '../../containers/settings-group';
import { SettingsAvatar, SettingsAvatarProps } from '../settings-avatar';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';
import { UpdatedUserAvatarType, UpdatedUserSettingsType } from '../../models/settings-user.model';
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
  const [avatarUserFile, setAvatarUserFile] = useState(null);
  const [avatarArrayBuffer, setAvatarArrayBuffer] = useState(null);
  const [loadedFilename, setLoadedFilename] = useState('');

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'User',
    unsavedDataExist,
    saveButtonClickHanlder: async () => {
      if (avatarUserFile !== null) {
        const updatedUserAvatar: UpdatedUserAvatarType = {
          avatarUserFile,
          successCallback: () => {
            setAvatarUserFile(null);
            setAvatarArrayBuffer(null);
            setLoadedFilename('');
  
            if (nameValue.trim() === name && usernameValue.trim() === username) {
              setUnsavedDataExist(false);
            }
  
            updateUserData();
          },
        };
  
        settingsController.emit(SettingsEvents.UPDATE_USER_AVATAR, updatedUserAvatar);
      } else {
        updateUserData();
      }
    },
  };

  const settingsAvatarProps: SettingsAvatarProps = {
    avatarArrayBuffer,
    loadedFilename,
    setAvatarArrayBuffer,
    setLoadedFilename,
    setAvatarUserFile: (blob: Blob) => {
      setAvatarUserFile(blob);
      setUnsavedDataExist(nameValue !== name || usernameValue !== username || blob !== null);
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
      setUnsavedDataExist(value !== name || usernameValue !== username || avatarUserFile !== null);

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
      setUnsavedDataExist(value !== username || nameValue !== name || avatarUserFile !== null);

      if (usernameError) {
        setUsernameError('');
      }
    },
  };

  function updateUserData() {
    const updatedUser: UpdatedUserSettingsType = {
      newName: nameValue.trim() === name ? undefined : nameValue.trim(),
      newUsername: usernameValue.trim() === username ? undefined : usernameValue.trim(),
      successCallback: () => {
        if (avatarUserFile === null) {
          setUnsavedDataExist(false);
        }
      },
      errorCallback: (result: ValidationError) => {
        const {message, payload} = result;
        updateError(message, payload.inputLabel);
      },
    };

    settingsController.emit(SettingsEvents.UPDATE_USER, updatedUser);
  }

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
      <SettingsAvatar {...settingsAvatarProps} />
      <SettingsGroup {...settingsGroupProps}>
        <Base.Input {...nameInputProps} />
        <Base.Input {...usernameInputProps} />
      </SettingsGroup>
    </SettingsSection>
  );
}
