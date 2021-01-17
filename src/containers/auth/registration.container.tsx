import React from 'react';

import { AppRoutePathnames, AuthModes, UserDataLabels } from '../../constants';
import { AuthFormComponent, AuthFormComponentProps } from '../../components/auth-form.component';
import { AuthFormPropsParameters, useAuthFormProps } from '../../hooks/auth-form-props.hook';
import { UserInputPropsHookParams, useUserInputProps } from '../../hooks/user-input-props.hook';
import { BaseInputProps } from '../../components/base';
import { AuthContainer } from './auth.container';

export default function RegistrationContainer() {
  const authFormPropsParameters: AuthFormPropsParameters = {
    mode: AuthModes.REGISTRATION,
    nextRoutePathname: AppRoutePathnames.LOGIN,
  };
  const fullnameInputPropsHookParams: UserInputPropsHookParams = {
    dataLabel: UserDataLabels.FULLNAME,
  };

  const authFormComponentProps: AuthFormComponentProps = useAuthFormProps(authFormPropsParameters);
  const fullnameInputProps: BaseInputProps = useUserInputProps(fullnameInputPropsHookParams);

  authFormComponentProps.inputsProps.unshift(fullnameInputProps);

  return (
    <AuthContainer>
      <AuthFormComponent {...authFormComponentProps} />
    </AuthContainer>
  );
}
