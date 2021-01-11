import React from 'react';

import { AppRoutePathnames, UserDataLabels } from '../constants';
import { useAuthForm } from '../hooks/auth-form.hooks';
import { useUserInputProps } from '../hooks/user-input-props.hooks';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';

export default function LoginContainer() {
  const [authError, authFormLinkClickHandler] = useAuthForm(AppRoutePathnames.LOGIN);
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
    linkClickHanlder: authFormLinkClickHandler,
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
