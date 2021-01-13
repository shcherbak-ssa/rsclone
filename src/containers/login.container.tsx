import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames, UserDataLabels, UserInputsEvents } from '../constants';
import { userInputsController } from '../controllers/user-inputs.controller';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { LanguageParts } from '../../common/constants';
import { useUserInputProps } from '../hooks/user-input-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';

export default function LoginContainer() {
  const history = useHistory();
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const emailInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps = useUserInputProps(UserDataLabels.PASSWORD);

  const authFormComponentProps: AuthFormComponentProps = {
    title: authLanguage.login.title,
    linkText: authLanguage.login.linkText,
    authError: '',
    inputsProps: [
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: authLanguage.login.buttonValue,
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
