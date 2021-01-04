import React from 'react';
import { Provider } from 'react-redux';

import { Theme } from './constants';
import { AppContainerProps, AppContainer } from './containers/app-container';
import { store } from './store';

export default function AppComponent() {
  const appContainerProps: AppContainerProps = {
    theme: Theme.ORIGINAL,
  };
  
  return (
    <Provider store={store}>
      <AppContainer {...appContainerProps} />
    </Provider>
  );
}
