import { useState } from 'react';
import { useSelector } from 'react-redux';
import eyeIcon from '@iconify/icons-ant-design/eye-outlined';

import { UserDraftEvents } from '../constants/events.constants';
import { Stores, UserDataLabels } from '../constants';
import { BaseInputProps } from '../components/base';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';
import { storeSelectorsService } from '../services/store-selectors.service';
import { InputState } from '../types/user-draft.types';
import { useLanguagePart } from './language-part.hook';
import { LanguageParts } from '../../common/constants';

export function useUserInputProps(dataLabel: UserDataLabels): BaseInputProps {
  const [isPasswordInputIconActive, setPasswordInputIsIconActive] = useState(false);

  const userDraftStoreSelectors = storeSelectorsService.get(Stores.USER_DRAFT_STORE);
  const getInputStatesSelector = userDraftStoreSelectors.getState(dataLabel);
  
  const {value, error} = useSelector(getInputStatesSelector) as InputState;
  const userInputsLanguage = useLanguagePart(LanguageParts.USER_DRAFT);

  const inputProps: BaseInputProps = {
    value,
    error,
    placeholder: userInputsLanguage[dataLabel].placeholder,
    updateValue,
    ...appendPasswordInputProps(),
  };

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
    const updatedDraftValue: UpdatedDraftValue = {
      value: newValue,
      dataLabel,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftValue);
  }
  
  return inputProps;
}
