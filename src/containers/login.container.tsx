import React from 'react';

import { AppRoutePathnames } from '../constants';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { useAuthForm } from '../hooks/auth-form.hooks';

export default function LoginContainer() {
  const [authError, authFormLinkClickHandler] = useAuthForm(AppRoutePathnames.LOGIN);

  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Login',
    linkText: 'Do not have an account?',
    authError,
    buttonProps: {
      value: 'Login',
      clickHandler: () => {},
    },
    linkClickHanlder: authFormLinkClickHandler,
  }

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps}>
      </AuthFormComponent>
    </AuthComponent>
  );
}
