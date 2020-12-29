import React from 'react';
import { LOGIN_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';
import { Input } from './input';

type RegistrationProps = {
  toggleMode: Function,
};

export function Registration({
  toggleMode,
}: RegistrationProps) {
  const formContainerProps: FormContainerProps = {
    title: 'Registration',
    socialDescription: 'You can sign up with social',
    buttonValue: 'Create account',
    message: 'Already have an account? ',
    messageLink: 'Login',
    nextHistoryPath: LOGIN_ROUTE_PATHNAME,
    toggleMode,
  };

  const inputs = [1, 2, 3];

  return (
    <FormContainer {...formContainerProps}>
      {inputs.map((item, index) => <Input key={index} />)}
    </FormContainer>
  );
}
