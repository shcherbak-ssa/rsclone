import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { AppRoutePathnames } from '../constants';

import { UserInputsEvents } from '../constants/events.constants';
import { userInputsController } from '../controllers/user-inputs.controller';

type EntryContainerProps = {
  initialRoutePathname: string;
};

export function EntryContainer({initialRoutePathname}: EntryContainerProps) {
  const history = useHistory();
  const LoginContainer = lazy(() => import('./auth/login.container'));
  const RegistrationContainer = lazy(() => import('./auth/registration.container'));
  const AppContainer = lazy(() => import('./app.container'));

  useEffect(() => {
    history.push(initialRoutePathname);
    userInputsController.emit(UserInputsEvents.INIT_EVENTS);
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path={AppRoutePathnames.LOGIN} component={LoginContainer} />
        <Route path={AppRoutePathnames.REGISTRATION} component={RegistrationContainer} />
        <Route path={AppRoutePathnames.ROOT} component={AppContainer} />
      </Switch>
    </Suspense>
  );
}
