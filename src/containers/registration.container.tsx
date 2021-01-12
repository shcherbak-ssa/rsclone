import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames, Stores, UserDataLabels, UserInputsEvents } from '../constants';
import { useAuthError } from '../hooks/auth-error.hooks';
import { useUserInputProps } from '../hooks/user-input-props.hooks';

import { userInputsController } from '../controllers/user-inputs.controller';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { storeService } from '../services/store.service';
import { useSelector } from 'react-redux';
import { LanguageParts } from '../../common/constants';

export default function RegistrationContainer() {
  const history = useHistory();
  const authError = useAuthError();
  const languageSelector = storeService.getStoreSelectors(Stores.LANGUAGE_STORE);
  const language: any = useSelector(languageSelector.getLanguagePart(LanguageParts.AUTH));

  const fullnameInputProps = useUserInputProps(UserDataLabels.FULLNAME);
  const emailInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps = useUserInputProps(UserDataLabels.PASSWORD);
  
  const authFormComponentProps: AuthFormComponentProps = {
    title: language.registration.title,
    linkText: language.registration.linkText,
    authError,
    inputsProps: [
      fullnameInputProps,
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: language.registration.buttonValue,
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      userInputsController.emit(UserInputsEvents.RESET_STATES);
      history.push(AppRoutePathnames.LOGIN);
    },
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
