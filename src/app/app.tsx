import React, { useEffect } from 'react';
import { Provider } from 'react-redux';

import { UserEvents } from './constants';
import { AppContainer } from './containers/app-container';
import { userController } from './controllers/user.controller';
import { store } from './store';

export default function AppComponent() {
  useEffect(() => {
    userController.emit(UserEvents.LOAD_USER);
  }, []);
  
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
