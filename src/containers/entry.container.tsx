import React, { lazy, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';

type AppContainerProps = {
  initialRoutePathname: string;
};

export function EntryContainer({initialRoutePathname}: AppContainerProps) {
  const history = useHistory();

  const LoginContainer = lazy(() => import('./login.container'));
  const RegistrationContainer = lazy(() => import('./registration.container'));

  useEffect(() => {
    history.push(initialRoutePathname);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path={AppRoutePathnames.LOGIN} component={LoginContainer} />
        <Route path={AppRoutePathnames.REGUSTRATION} component={RegistrationContainer} />
      </Switch>
    </Router>
  );
}
