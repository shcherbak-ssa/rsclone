import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';
import { useAuthError } from '../hooks/auth-error.hooks';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';

export default function RegistrationContainer() {
  const history = useHistory();
  const authError = useAuthError();
  
  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Registration',
    linkText: 'Already have an account?',
    authError,
    inputsProps: [],
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
