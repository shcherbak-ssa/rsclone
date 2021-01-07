import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './settings-login.scss';

import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { SettingsSection, SettingsSectionProps } from '../../containers/settings-section';
import { SettingsAction, SettingsActionProps } from '../../containers/settings-action';
import { Popup, PopupProps } from '../../containers/popup';
import { Base, BaseInputProps } from '../base';
import { storeSelectors } from '../../store';
import { ConfirmPasswordType, UpdatedLoginSettingsType } from '../../models/settings-login.model';
import { settingsController } from '../../controllers/settings.controller';
import { SettingsEvents } from '../../constants';
import { ValidationError } from '../../../services/validation.service';
import { InputLabels } from '../../../constants';

export function SettingsLogin() {
  const {email} = useSelector(storeSelectors.user.get());
  const [emailValue, setEmailValue] = useState(email);
  const [emailError, setEmailError] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [unsavedDataExist, setUnsavedDataExist] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEnterNewPasswordState, setIsEnterNewPasswordState] = useState(false);
  const [isInputIconActive, setInputIsIconActive] = useState(false);

  const settingsSectionProps: SettingsSectionProps = {
    isActive: true,
    title: 'Login',
    unsavedDataExist,
    saveButtonClickHanlder: () => {
      const updatedLoginSettings: UpdatedLoginSettingsType = {
        newEmail: emailValue.trim() === email ? undefined : emailValue.trim(),
        newPassword: passwordValue.trim() === '' ? undefined : passwordValue.trim(),
        successCallback: () => {
          setUnsavedDataExist(false);
          setIsEnterNewPasswordState(false);
          setPasswordValue('');
        },
        errorCallback: ({message, payload}: ValidationError) => {
          updateError(message, payload.inputLabel);
        },
      };

      settingsController.emit(SettingsEvents.UPDATE_LOGIN, updatedLoginSettings);
    },
  };

  const emailInputProps: BaseInputProps = {
    value: emailValue,
    placeholder: 'E-mail',
    error: emailError,
    updateValue: (value: string) => {
      setEmailValue(value);
      setUnsavedDataExist(
        value !== email || (isEnterNewPasswordState && passwordValue !== '')
      );

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
        const confirmPassword: ConfirmPasswordType = {
          password: passwordValue,
          successCallback: () => {
            setIsPopupOpen(false);
            setPasswordValue('');
            setIsEnterNewPasswordState(true);
          },
          errorCallback: (message: string) => {
            setPasswordError(message);
          },
        };

        settingsController.emit(SettingsEvents.CONFIRM_PASSWORD, confirmPassword);
      },
    },
    closePopup: () => {
      setIsPopupOpen(false);
    },
  };

  const passwordInputProps: BaseInputProps = {
    value: passwordValue,
    placeholder: 'Password',
    error: passwordError,
    updateValue: (value: string) => {
      if (!isInputIconActive) {
        value = removeDots(passwordValue, value);
      }

      setPasswordValue(value);

      if (passwordError) {
        setPasswordError('');
      }

      if (isEnterNewPasswordState) {
        setUnsavedDataExist(
          value !== '' || emailValue !== email
        );
      }
    },
    icon: eyeIcon,
    iconClickHandler: (isActive: boolean) => {
      setInputIsIconActive(isActive);
    },
    transformValue: (value: string) => {
      return isInputIconActive ? value : value.replace(/[^\n]/ig, '●');
    },
  };

  function removeDots(oldValue: string, newValue: string) {
    const splitedValue = oldValue.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  function showConfirmPasswordPopup() {
    if (!isPopupOpen) return '';

    return (
      <Popup {...confirmPasswordPopupProps}>
        <div className="confirm-password-popup-body">
          <Base.Input {...passwordInputProps} description="Enter your current password to contrinue" />
        </div>
      </Popup>
    );
  }

  function updateError(message: string, inputLabel: InputLabels) {
    switch (inputLabel) {
      case InputLabels.EMAIL_INPUT_LABEL:
        setEmailError(message);
        break;
      case InputLabels.PASSWORD_INPUT_LABEL:
        setPasswordError(message);
        break;
    }
  }

  return (
    <SettingsSection {...settingsSectionProps}>
      <Base.Input {...emailInputProps} />
      {
        isEnterNewPasswordState
          ? <Base.Input {...passwordInputProps} description="Enter new password" />
          : <SettingsAction {...settingsActionProps} />
      }
      {showConfirmPasswordPopup()}
    </SettingsSection>
  );
}
