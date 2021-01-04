import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { UserEvents } from './constants';
import { AppContainer } from './containers/app-container';
import { userController } from './controllers/user.controller';
import { store } from './store';

export default function AppComponent() {
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    userController.emit(UserEvents.LOAD_USER, () => {
      setIsUserDataLoaded(true);
    });
  }, []);

  if (isUserDataLoaded) {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  } else {
    return <div>Loading...</div>
  }
}
