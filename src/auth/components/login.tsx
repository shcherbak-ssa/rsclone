import React from 'react';
import { REGISTRATION_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';
import { Input } from './input';

type LoginProps = {
  toggleMode: Function,
};

export function Login({
  toggleMode,
}: LoginProps) {
  const formContainerProps: FormContainerProps = {
    title: 'Login',
    socialDescription: 'You can sign in with social',
    buttonValue: 'Login account',
    message: 'Do not have an account? ',
    messageLink: 'Registration',
    nextHistoryPath: REGISTRATION_ROUTE_PATHNAME,
    toggleMode,
  };

  const inputs = [1, 2, ];

  return (
    <FormContainer {...formContainerProps}>
      {inputs.map((item, index) => <Input key={index} />)}
    </FormContainer>
  );
}
