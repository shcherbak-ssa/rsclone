import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { Theme, UserEvents } from './constants';
import { AppContainerProps, AppContainer } from './containers/app-container';
import { userController } from './controllers/user.controller';
import { store } from './store';

export default function AppComponent() {
  const appContainerProps: AppContainerProps = {
    theme: Theme.ORIGINAL,
  };

  useEffect(() => {
    userController.emit(UserEvents.LOAD_USER);
  }, []);
  
  return (
    <Provider store={store}>
      <AppContainer {...appContainerProps} />
    </Provider>
  );
}
