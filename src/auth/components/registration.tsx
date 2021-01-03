import React from 'react';
import { LOGIN_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';
import { InputName } from './input-name';
import { InputEmail } from './input-email';
import { InputPassword } from './input-password';

export function Registration() {
  const formContainerProps: FormContainerProps = {
    title: 'Registration',
    buttonValue: 'Create account',
    message: 'Already have an account? ',
    messageLink: 'Login',
    nextHistoryPath: LOGIN_ROUTE_PATHNAME,
  };

  return (
    <FormContainer {...formContainerProps}>
      <InputName />
      <InputEmail />
      <InputPassword />
    </FormContainer>
  );
}
