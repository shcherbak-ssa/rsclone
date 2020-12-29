import React from 'react';
import { LOGIN_ROUTE_PATHNAME } from '../constants';
import { FormContainerProps, FormContainer } from '../containers/form-container';

export function Registration() {
  const formContainerProps: FormContainerProps = {
    title: 'Registration',
    socialDescription: 'You can sign up with social',
    buttonValue: 'Create account',
    message: 'Already have an account? ',
    messageLink: 'Login',
    nextHistoryPath: LOGIN_ROUTE_PATHNAME,
  };

  return (
    <FormContainer {...formContainerProps}>
      <div>messageLinkClickHandle</div>
    </FormContainer>
  );
}
