import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AppRoutes } from './app/constants';
import { USER_LOCALSTORAGE_LABEL } from './constants';
import { LocalStorageService } from './services/localstorage.service';

export function EntryRouter() {
  const history = useHistory();
  const AppComponent = lazy(() => import('./app'));
  const AuthComponent = lazy(() => import('./auth'));

  useEffect(() => {
    const localStorageService: LocalStorageService = new LocalStorageService();
    
    if (localStorageService.exists(USER_LOCALSTORAGE_LABEL)) {
      history.push(AppRoutes.ROOT);
    } else {
      history.push('/');
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/" exact component={AuthComponent} />
        <Route path={AppRoutes.ROOT} component={AppComponent} />
      </Switch>
    </Suspense>
  );
}
