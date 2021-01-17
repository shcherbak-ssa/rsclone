import { UserDataLabels } from '../constants';
import { BaseInputProps } from '../components/base';
import { useUserDraftState } from './user-draft-state.hook';
import { useUserInputLanguage } from './user-input-language.hook';
import { useUserInputUpdate } from './user-input-update.hook';

export function useUserInputProps(dataLabel: UserDataLabels): BaseInputProps {
  const {value, error} = useUserDraftState(dataLabel);
  const inputLanguage = useUserInputLanguage(dataLabel);
  const updateValue = useUserInputUpdate(dataLabel);

  const inputProps: BaseInputProps = {
    value,
    error,
    placeholder: inputLanguage.placeholder,
    updateValue,
  };
  
  return inputProps;
}
