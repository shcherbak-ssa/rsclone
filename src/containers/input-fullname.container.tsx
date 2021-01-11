import React from 'react';
import { useSelector } from 'react-redux';

import { UserDataLabels } from '../constants';
import { InputsSelectors } from '../types/selectors.types';
import { Base, BaseInputProps } from '../components/base';
import { AuthStore } from '../store/auth.store';

export type InputFullnameContainerProps = {
  inputsSelector: InputsSelectors;
};

export function InputFullnameContainer({inputsSelector}: InputFullnameContainerProps) {
  const inputLabel = UserDataLabels.FULLNAME;
  const {value, error} = useSelector(inputsSelector.getFullnameInput());
  
  const inputComponentProps: BaseInputProps = {
    placeholder: 'Full name', value, error,
    updateValue: (value: string) => {
      const authStore = new AuthStore();
      authStore.updateInputValue(value, inputLabel);
    },
  };

  return <Base.Input {...inputComponentProps} />;
}
