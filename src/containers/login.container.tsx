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

export default function LoginContainer() {
  const history = useHistory();
  const authError = useAuthError();
  const languageSelector = storeService.getStoreSelectors(Stores.LANGUAGE_STORE);
  const language: any = useSelector(languageSelector.getLanguagePart(LanguageParts.AUTH));

  const emailInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps = useUserInputProps(UserDataLabels.PASSWORD);

  const authFormComponentProps: AuthFormComponentProps = {
    title: language.login.title,
    linkText: language.login.linkText,
    authError,
    inputsProps: [
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: language.login.buttonValue,
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      userInputsController.emit(UserInputsEvents.RESET_STATES);
      history.push(AppRoutePathnames.REGISTRATION);
    },
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
