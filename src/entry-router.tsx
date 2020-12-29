import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

export function EntryRouter() {
  const AuthComponent = lazy(() => {
    return import('./auth').then(({ AuthComponent }) => ({ default: AuthComponent }));
  });
  const AppComponent = lazy(() => {
    return import('./app').then(({ AppComponent }) => ({ default: AppComponent }));
  });

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/">
            <AuthComponent />
          </Route>
        </Switch>
      </Suspense>
    </Router>
  );
}
