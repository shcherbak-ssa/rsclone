import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames, UserDataLabels } from '../constants';
import { useAuthError } from '../hooks/auth-error.hooks';
import { useUserInputProps } from '../hooks/user-input-props.hooks';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';

export default function RegistrationContainer() {
  const history = useHistory();
  const authError = useAuthError();

  const fullnameInputProps = useUserInputProps(UserDataLabels.FULLNAME);
  const emailInputProps = useUserInputProps(UserDataLabels.EMAIL);
  const passwordInputProps = useUserInputProps(UserDataLabels.PASSWORD);
  
  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Registration',
    linkText: 'Already have an account?',
    authError,
    inputsProps: [
      fullnameInputProps,
      emailInputProps,
      passwordInputProps,
    ],
    buttonProps: {
      value: 'Create account',
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      history.push(AppRoutePathnames.LOGIN);
    },
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
