import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import {
  USER_LOCALSTORAGE_LABEL,
  APP_INITIAL_ROUTES_STRING,
  ROOT_ROUTE_PATH,
} from './constants';
import { LocalStorageService } from './services/localstorage.service';

export function EntryRouter() {
  const history = useHistory();
  const [appRoute, setAppRoute] = useState(ROOT_ROUTE_PATH);

  const AppComponent = lazy(() => import('./app'));
  const AuthComponent = lazy(() => import('./auth'));

  useEffect(() => {
    const localStorageService: LocalStorageService = new LocalStorageService();
    
    if (localStorageService.exists(USER_LOCALSTORAGE_LABEL)) {
      let initialAppRoute = '';

      if (location.pathname.startsWith(APP_INITIAL_ROUTES_STRING)) {
        initialAppRoute = location.pathname;
      } else {
        const {username} = localStorageService.get(USER_LOCALSTORAGE_LABEL);
        initialAppRoute = APP_INITIAL_ROUTES_STRING + username;
      }

      setAppRoute(initialAppRoute);
      history.push(initialAppRoute);
    } else {
      history.push(ROOT_ROUTE_PATH);
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={ROOT_ROUTE_PATH} exact component={AuthComponent} />
        <Route path={appRoute} component={AppComponent} />
      </Switch>
    </Suspense>
  );
}
