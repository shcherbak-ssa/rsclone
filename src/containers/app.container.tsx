import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppComponent } from '../components/app.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';

export default function AppContainer() {
  const appRoutesService: AppRoutesService = new AppRoutesService();
  useChangeTheme();

  return (
    <AppComponent>
      <Switch>
        <Route path={appRoutesService.getRootRoutePath()} exact component={SpacesContainer}/>
        <Route path={appRoutesService.getSpacesRoutePath()} component={SpacesContainer}/>
        <Route path={appRoutesService.getSettingsRoutePath()} component={SettingsContainer}/>
      </Switch>
    </AppComponent>
  );
}
