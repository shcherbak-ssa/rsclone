import { useState } from 'react';
import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { BaseInputProps } from '../components/base';
import { UserDataLabels } from '../constants';
import { useUserInputLanguage } from './user-input-language.hook';
import { useUserDraftState } from './user-draft-state.hook';
import { useUserInputUpdate } from './user-input-update.hook';

export function usePasswordInputProps(
  dataLabel: UserDataLabels = UserDataLabels.PASSWORD
): BaseInputProps {
  const [isPasswordInputIconActive, setPasswordInputIsIconActive] = useState(false);

  const {value, error} = useUserDraftState(dataLabel);
  const inputLanguage = useUserInputLanguage(dataLabel);
  const updateValue = useUserInputUpdate(dataLabel);

  const inputProps: BaseInputProps = {
    value,
    error,
    placeholder: inputLanguage.placeholder,
    updateValue: (newValue: string) => {
      if (!isPasswordInputIconActive) {
        newValue = removeDots(value, newValue);
      }

      updateValue(newValue);
    },
    inputIconProps: {
      icon: eyeIcon,
      iconClickHandler: (isActive: boolean) => {
        setPasswordInputIsIconActive(isActive);
      },
    },
    transformValue: (value: string) => {
      return isPasswordInputIconActive ? value : value.replace(/[^\n]/ig, '●');
    }
  };

  function removeDots(oldValue: string, newValue: string) {
    const splitedValue = oldValue.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  return inputProps;
}
