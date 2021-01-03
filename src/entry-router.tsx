import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { USER_LOCALSTORAGE_LABEL } from './constants';
import { LocalStorageService } from './services/localstorage.service';

export function EntryRouter() {
  const [userExists, setUserExists] = useState(false);
  const AppComponent = lazy(() => import('./app'));
  const AuthComponent = lazy(() => import('./auth'));

  useEffect(() => {
    const localStorageService: LocalStorageService = new LocalStorageService();
    
    if (localStorageService.exists(USER_LOCALSTORAGE_LABEL)) {
      setUserExists(true);
    }
  }, []);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/">
            {userExists ? <AppComponent /> : <AuthComponent />}
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
