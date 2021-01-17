import { useState } from 'react';
import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { BaseInputProps } from '../components/base';
import { UserDataLabels } from '../constants';
import { InputDraftDescriptionLabels } from '../constants/ui.constants';
import { UserInputPropsHookParams, useUserInputProps } from './user-input-props.hook';

export type PasswordInputPropsHookParams = {
  dataLabel?: UserDataLabels,
  descriptionLabel?: InputDraftDescriptionLabels,
};

export function usePasswordInputProps({
  dataLabel = UserDataLabels.PASSWORD, descriptionLabel
}: PasswordInputPropsHookParams): BaseInputProps {
  const [isPasswordInputIconActive, setPasswordInputIsIconActive] = useState(false);

  const passwordInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel,
    descriptionLabel,
  };

  const inputProps: BaseInputProps = useUserInputProps(passwordInputPropsHookParams);
  const passwordInputProps: BaseInputProps = {
    ...inputProps,
    updateValue: (newValue: string) => {
      if (!isPasswordInputIconActive) {
        newValue = removeDots(inputProps.value, newValue);
      }

      inputProps.updateValue(newValue);
    },
    inputIconProps: {
      icon: eyeIcon,
      iconClickHandler: (isActive: boolean) => {
        setPasswordInputIsIconActive(isActive);
      },
    },
    transformValue: (value: string) => {
      return isPasswordInputIconActive ? value : value.replace(/[^\n]/ig, '●');
    },
  };

  function removeDots(oldValue: string, newValue: string) {
    const splitedValue = oldValue.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  return passwordInputProps;
}
