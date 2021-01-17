import { UserDataLabels } from '../constants';
import { BaseInputProps } from '../components/base';
import { useUserDraftState } from './user-draft-state.hook';
import { useUserInputLanguage } from './user-input-language.hook';
import { useUserInputUpdate } from './user-input-update.hook';
import { InputDraftDescriptionLabels } from '../constants/ui.constants';

export type UserInputPropsHookParams = {
  dataLabel: UserDataLabels,
  descriptionLabel?: InputDraftDescriptionLabels,
};

export function useUserInputProps({
  dataLabel, descriptionLabel,
}: UserInputPropsHookParams): BaseInputProps {
  const {value, error} = useUserDraftState(dataLabel);
  const inputLanguage = useUserInputLanguage(dataLabel);
  const updateValue = useUserInputUpdate(dataLabel);

  const inputProps: BaseInputProps = {
    value,
    error,
    placeholder: inputLanguage.placeholder,
    updateValue,
    ...addDescription(),
  };

  function addDescription() {
    if (!descriptionLabel) return {};

    return {
      description: inputLanguage.description[descriptionLabel],
    };
  }
  
  return inputProps;
}
