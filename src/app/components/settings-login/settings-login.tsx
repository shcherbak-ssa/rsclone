import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-login.scss';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { Popup, PopupProps } from '../../containers/popup';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';
import { UpdatedEmailType } from '../../models/settings-login.model';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';

export function SettingsLogin() {
  const {email} = useSelector(storeSelectors.user.get());
  const [emailValue, setEmailValue] = useState(email);
  const [emailError, setEmailError] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      clickHandler: () => {
        setIsPopupOpen(true);
      },
    },
  };

  const confirmPasswordPopupProps: PopupProps = {
    title: 'Password confirmation',
    confirmButtonProps: {
      value: 'Confirm password',
      clickHandler: () => {
        console.log(passwordValue);
      },
    },
    closePopup: () => {
      setIsPopupOpen(false);
    },
  };

  const confirmPasswordInputProps: BaseInputProps = {
    value: passwordValue,
    placeholder: 'Password',
    error: passwordError,
    description: 'Enter your current password to contrinue',
    updateValue: (value: string) => {
      setPasswordValue(value);

      if (passwordError) {
        setPasswordError('');
      }
    },
  };

  function showConfirmPasswordPopup() {
    if (!isPopupOpen) return '';

    return (
      <Popup {...confirmPasswordPopupProps}>
        <div className="confirm-password-popup-body">
          <Base.Input {...confirmPasswordInputProps} />
        </div>
      </Popup>
    );
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Input {...emailInputProps} />
      <SettingsAction {...settingsActionProps} />
      {showConfirmPasswordPopup()}
    </SettingsSection>
  );
}
