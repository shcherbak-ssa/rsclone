import React from 'react';
import { useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';
import { InputFullnameContainer, InputFullnameContainerProps } from './input-fullname.container';
import { AuthComponentProps, AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { authStoreSelectors } from '../store/auth.store';

export default function LoginContainer() {
  const history = useHistory();

  const authComponentProps: AuthComponentProps = {
    isLogin: true,
  };

  const authFormComponentProps: AuthFormComponentProps = {
    title: 'Login',
    linkText: 'Do not have an account?',
    buttonProps: {
      value: 'Login',
      clickHandler: () => {},
    },
    linkClickHanlder: () => {
      history.push(AppRoutePathnames.REGISTRATION);
    },
  }

  const inputFullnameContainerProps: InputFullnameContainerProps = {
    inputsSelector: authStoreSelectors,
  };

  return (
    <AuthComponent {...authComponentProps}>
      <AuthFormComponent {...authFormComponentProps}>
        <InputFullnameContainer {...inputFullnameContainerProps} />
      </AuthFormComponent>
    </AuthComponent>
  );
}
