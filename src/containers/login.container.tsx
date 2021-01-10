import React from 'react';
import { AuthComponentProps, AuthComponent } from '../components/auth';

export function LoginContainer() {
  const authComponentProps: AuthComponentProps = {
    isLogin: true,
  };

  return <AuthComponent {...authComponentProps} />
}
