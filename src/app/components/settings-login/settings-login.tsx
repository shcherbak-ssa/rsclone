import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-login.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';
import { UpdatedEmailType } from '../../models/settings-login.model';
import { ValidationError } from '../../../services/validation.service';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';

export function SettingsLogin() {
  const {email} = useSelector(storeSelectors.user.get());
  const [emailValue, setEmailValue] = useState(email);
  const [emailError, setEmailError] = useState('');
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Login',
    unsavedDataExist,
    saveButtonClickHanlder: () => {
      const updatedEmail: UpdatedEmailType = {
        newEmail: emailValue,
        successCallback: () => {
          setUnsavedDataExist(false);
        },
        errorCallback: (message: string) => {
          setEmailError(message);
        },
      };

      settingsController.emit(SettingsEvents.UPDATE_EMAIL, updatedEmail);
    },
  };

  const emailInputProps: BaseInputProps = {
    value: emailValue,
    placeholder: 'E-mail',
    error: emailError,
    updateValue: (value: string) => {
      setEmailValue(value);
      setUnsavedDataExist(value !== email);

      if (emailError) {
        setEmailError('');
      }
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
