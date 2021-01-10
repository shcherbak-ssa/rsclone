import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';
import { AuthComponentProps, AuthComponent } from '../components/auth.component';

export function RegistrationContainer() {
  const history = useHistory();

  const authComponentProps: AuthComponentProps = {
    isLogin: true,
    authFormProps: {
      title: 'Registration',
      inputsProps: [],
      buttonProps: {
        value: 'Create account',
        clickHandler: () => {},
      },
      linkText: 'Already have an account? Login',
      linkClickHanlder: () => {
        history.push(AppRoutePathnames.LOGIN);
      },
    },
  };

  return <AuthComponent {...authComponentProps} />
}
