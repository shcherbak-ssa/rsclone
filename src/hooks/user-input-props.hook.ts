import { useState } from 'react';
import { useSelector } from 'react-redux';

import { UserDraftEvents } from '../constants/events.constants';
import { UserDataLabels } from '../constants';
import { BaseInputProps } from '../components/base';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';
import { useUserInputStates } from './user-input-states.hook';
import { useUserInputLanguage } from './user-input-language.hook';
import { useUserInputUpdate } from './user-input-update.hook';

export function useUserInputProps(dataLabel: UserDataLabels): BaseInputProps {
  const {value, error} = useUserInputStates(dataLabel);
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
