import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

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
    <Suspense fallback={<div>...loading</div>}>
      <Switch>
        <Route path={AppRoutePathnames.LOGIN} component={LoginContainer} />
        <Route path={AppRoutePathnames.REGISTRATION} component={RegistrationContainer} />
      </Switch>
    </Suspense>
  );
}
