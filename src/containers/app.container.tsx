import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { AppComponent } from '../components/app.component';
import { useChangeTheme } from '../hooks/change-theme.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesContainer } from './spaces.container';
import { SettingsContainer } from './settings.container';

export default function AppContainer() {
  // @TODO: fix change route after username updating
  const appRoutes: AppRoutesService = new AppRoutesService()
  useChangeTheme();

  return (
    <AppComponent>
      <Switch>
        <Route path={appRoutes.getRootRoutePath()} exact component={SpacesContainer}/>
        <Route path={appRoutes.getSpacesRoutePath()} component={SpacesContainer}/>
        <Route path={appRoutes.getSettingsRoutePath()} component={SettingsContainer}/>
      </Switch>
    </AppComponent>
  );
}
