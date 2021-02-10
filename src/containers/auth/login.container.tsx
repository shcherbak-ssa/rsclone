import React from 'react';

import { AppRoutePathnames, AuthModes } from '../../constants';
import { AuthFormComponent, AuthFormComponentProps } from '../../components/auth-form.component';
import { AuthFormPropsParameters, useAuthFormProps } from '../../hooks/auth-form-props.hook';
import { AuthContainer } from './auth.container';

export default function LoginContainer() {
  const authFormPropsParameters: AuthFormPropsParameters = {
    mode: AuthModes.LOGIN,
    nextRoutePathname: AppRoutePathnames.REGISTRATION,
  };

  const authFormComponentProps: AuthFormComponentProps = useAuthFormProps(authFormPropsParameters);

  return (
    <AuthContainer>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthContainer>
  );
}
