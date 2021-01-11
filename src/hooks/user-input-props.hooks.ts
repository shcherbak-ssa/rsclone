import { useState } from 'react';
import { useSelector } from 'react-redux';
import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { Stores, UserDataLabels } from '../constants';
import { storeService } from '../services/store.service';
import { BaseInputProps } from '../components/base';

// @TODO: need to remove
const placeholder = {
  [UserDataLabels.FULLNAME]: 'Full name',
  [UserDataLabels.EMAIL]: 'E-mail',
  [UserDataLabels.PASSWORD]: 'Password',
};

export function useUserInputProps(inputLabel: UserDataLabels): BaseInputProps {
  const userInputsStoreSelectros = storeService.getStoreSelectors(Stores.USER_INPUTS_STORE);
  const userInputStateActions = storeService.getStoreActions(Stores.USER_INPUTS_STORE);
  const inputStateSelector = userInputsStoreSelectros.getInputState(inputLabel);

  const {value, error} = useSelector(inputStateSelector) as any;
  const [isPasswordInputIconActive, setPasswordInputIsIconActive] = useState(false);

  function appendPasswordInputProps() {
    if (inputLabel !== UserDataLabels.PASSWORD) return {};

    return {
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
    }
  }

  function removeDots(oldValue: string, newValue: string) {
    const splitedValue = oldValue.split('').reverse();
    return newValue.replace(/●/g, () => splitedValue.pop() || '');
  }

  function updateValue(newValue: string) {
    userInputStateActions.updateInputValue(newValue, inputLabel);
  }
  
  return {
    value,
    error,
    placeholder: placeholder[inputLabel],
    updateValue,
    ...appendPasswordInputProps(),
  };
}
