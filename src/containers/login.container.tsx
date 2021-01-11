import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames, UserDataLabels } from '../constants';
import { useAuthError } from '../hooks/auth-error.hooks';
import { useUserInputProps } from '../hooks/user-input-props.hooks';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';

export default function LoginContainer() {
  const history = useHistory();
  const authError = useAuthError();
  const fullnameInputProps = useUserInputProps(UserDataLabels.FULLNAME);

  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Login',
    linkText: 'Do not have an account?',
    authError,
    inputsProps: [
      fullnameInputProps,
    ],
    buttonProps: {
      value: 'Login',
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      history.push(AppRoutePathnames.REGISTRATION);
    },
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
