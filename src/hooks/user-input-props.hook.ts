import { useState } from 'react';
import { useSelector } from 'react-redux';
import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { Stores, UserDataLabels, UserInputsEvents } from '../constants';
import { BaseInputProps } from '../components/base';
import { UpdatedInputValue, userInputsController } from '../controllers/user-inputs.controller';
import { storeSelectorsService } from '../services/store-selectors.service';
import { InputState } from '../types/user-inputs.types';
import { useLanguagePart } from './language-part.hook';
import { LanguageParts } from '../../common/constants';

export function useUserInputProps(dataLabel: UserDataLabels): BaseInputProps {
  const [isPasswordInputIconActive, setPasswordInputIsIconActive] = useState(false);

  const userInputsStoreSelectors = storeSelectorsService.get(Stores.USER_INPUTS_STORE);
  const getInputStatesSelector = userInputsStoreSelectors.getInputStates(dataLabel);
  
  const {value, error} = useSelector(getInputStatesSelector) as InputState;
  const userInputsLanguage = useLanguagePart(LanguageParts.USER_INPUTS);

  function appendPasswordInputProps() {
    if (dataLabel !== UserDataLabels.PASSWORD) return {};

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
    const updatedInputValue: UpdatedInputValue = {
      value: newValue,
      dataLabel,
    };

    userInputsController.emit(UserInputsEvents.UPDATE_INPUT_VALUE, updatedInputValue);
  }
  
  return {
    value,
    error,
    placeholder: userInputsLanguage[dataLabel].placeholder,
    updateValue,
    ...appendPasswordInputProps(),
  };
}
