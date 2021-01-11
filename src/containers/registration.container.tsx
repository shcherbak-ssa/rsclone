import React from 'react';

import { AppRoutePathnames } from '../constants';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { useAuthForm } from '../hooks/auth-form.hooks';

export default function RegistrationContainer() {
  const [authError, authFormLinkClickHandler] = useAuthForm(AppRoutePathnames.LOGIN);
  
  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Registration',
    linkText: 'Already have an account?',
    authError,
    inputsProps: [],
    buttonProps: {
      value: 'Create account',
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
