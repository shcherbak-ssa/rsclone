import React from 'react';
import { REGISTRATION_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';
import { InputEmail } from './input-email';
import { InputPassword } from './input-password';

export function Login() {
  const formContainerProps: FormContainerProps = {
    title: 'Login',
    buttonValue: 'Login account',
    message: 'Do not have an account? ',
    messageLink: 'Registration',
    nextHistoryPath: REGISTRATION_ROUTE_PATHNAME,
  };

  return (
    <FormContainer {...formContainerProps}>
      <InputEmail />
      <InputPassword />
    </FormContainer>
  );
}
