import React from 'react';
import { Provider } from 'react-redux';
import { AuthContainer } from './containers/auth-container';
import { store } from './store';

export function AuthComponent() {
  return (
    <Provider store={store}>
      <AuthContainer />
    </Provider>
  );
}
