import React from 'react';
import { useSelector } from 'react-redux';

import { AppComponent } from '../components/app.component';
import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { useChangeTheme } from '../hooks/change-theme.hook';

export default function AppContainer() {
  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const currentTheme = useSelector(userStoreSelectors.getState(UserDataLabels.THEME));

  useChangeTheme(currentTheme);

  return <AppComponent />;
}
