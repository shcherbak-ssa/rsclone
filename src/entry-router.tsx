import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { USER_LOCALSTORAGE_LABEL } from './constants';
import { LocalStorageService } from './services/localstorage.service';

export function EntryRouter() {
  const [user, setUser] = useState({});

  const AuthComponent = lazy(() => {
    return import('./auth').then(({ AuthComponent }) => ({ default: AuthComponent }));
  });
  const AppComponent = lazy(() => {
    return import('./app').then(({ AppComponent }) => ({ default: AppComponent }));
  });

  useEffect(() => {
    const localStorageService: LocalStorageService = new LocalStorageService();
    
    if (localStorageService.exists(USER_LOCALSTORAGE_LABEL)) {
      setUser(localStorageService.get(USER_LOCALSTORAGE_LABEL));
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/">
            {'id' in user ? <AppComponent {...user} /> : <AuthComponent />}
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
