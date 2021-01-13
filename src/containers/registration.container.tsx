import React from 'react';

import { AppRoutePathnames, AuthModes, UserDataLabels } from '../constants';
import { AuthComponent } from '../components/auth.component';
import { AuthFormComponent, AuthFormComponentProps } from '../components/auth-form.component';
import { AuthFormPropsParameters, useAuthFormProps } from '../hooks/auth-form-props.hook';
import { useUserInputProps } from '../hooks/user-input-props.hook';

export default function RegistrationContainer() {
  const authFormPropsParameters: AuthFormPropsParameters = {
    mode: AuthModes.REGISTRATION,
    nextRoutePathname: AppRoutePathnames.LOGIN,
  };

  const authFormComponentProps: AuthFormComponentProps = useAuthFormProps(authFormPropsParameters);
  const fullnameInputProps = useUserInputProps(UserDataLabels.FULLNAME);

  authFormComponentProps.inputsProps.unshift(fullnameInputProps);

  return (
    <AuthComponent>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthComponent>
  );
}
