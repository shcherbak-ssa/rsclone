import React from 'react';

import { AppRoutePathnames, AuthModes } from '../constants';
import { AuthFormComponentProps } from '../components/auth-form.component';
import { AuthFormPropsParameters, useAuthFormProps } from '../hooks/auth-form-props.hook';
import { AuthContainer, AuthContainerProps } from './auth.container';

export default function LoginContainer() {
  const authFormPropsParameters: AuthFormPropsParameters = {
    mode: AuthModes.LOGIN,
    nextRoutePathname: AppRoutePathnames.REGISTRATION,
  };

  const authFormComponentProps: AuthFormComponentProps = useAuthFormProps(authFormPropsParameters);

  const authContainerProps: AuthContainerProps = {
    authFormComponentProps,
  };

  return (
    <AuthContainer {...authContainerProps} />
  );
}
