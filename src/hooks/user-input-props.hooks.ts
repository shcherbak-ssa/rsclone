import { useSelector } from 'react-redux';

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
  
  return {
    placeholder: placeholder[inputLabel],
    value,
    error,
    updateValue: (value: string) => {
      userInputStateActions.updateInputValue(value, inputLabel);
    },
  };
}
