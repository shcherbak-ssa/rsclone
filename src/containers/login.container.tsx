import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';
import { AuthComponentProps, AuthComponent } from '../components/auth.component';

export function LoginContainer() {
  const history = useHistory();

  const authComponentProps: AuthComponentProps = {
    isLogin: true,
    authFormProps: {
      title: 'Login',
      inputsProps: [],
      buttonProps: {
        value: 'Login',
        clickHandler: () => {},
      },
      linkText: 'Do not have an account? Registration',
      linkClickHanlder: () => {
        history.push(AppRoutePathnames.REGUSTRATION);
      },
    },
  };

  return <AuthComponent {...authComponentProps} />
}
