import React from 'react';
import { useHistory } from 'react-router-dom';

import { UserInputsEvents } from '../constants/events.constants';
import { AppRoutePathnames, UserDataLabels } from '../constants';
import { userInputsController } from '../controllers/user-inputs.controller';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { LanguageParts } from '../../common/constants';
import { useUserInputProps } from '../hooks/user-input-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';

export default function RegistrationContainer() {
  const history = useHistory();
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const fullnameInputProps = useUserInputProps(UserDataLabels.FULLNAME);
  const emailInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps = useUserInputProps(UserDataLabels.PASSWORD);
  
  const authFormComponentProps: AuthFormComponentProps = {
    title: authLanguage.registration.title,
    linkText: authLanguage.registration.linkText,
    authError: '',
    inputsProps: [
      fullnameInputProps,
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: authLanguage.registration.buttonValue,
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
