import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';
import { AuthComponentProps, AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';

export default function RegistrationContainer() {
  const history = useHistory();

  const authComponentProps: AuthComponentProps = {
    isLogin: false,
  };

  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Registration',
    linkText: 'Already have an account?',
    buttonProps: {
      value: 'Create account',
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      history.push(AppRoutePathnames.LOGIN);
    },
  }

  return (
    <AuthComponent {...authComponentProps}>
      <AuthFormComponent {...authFormComponentProps}></AuthFormComponent>
    </AuthComponent>
  );
}
