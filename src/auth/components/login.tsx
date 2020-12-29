import React from 'react';
import { REGISTRATION_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';

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

  return (
    <FormContainer {...formContainerProps}>
      <div>messageLinkClickHandle</div>
    </FormContainer>
  );
}
