import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import { AppRoutePathnames, UserInputsEvents } from '../constants';
import { userInputsController } from '../controllers/user-inputs.controller';

type EntryContainerProps = {
  initialRoutePathname: string;
};

export function EntryContainer({initialRoutePathname}: EntryContainerProps) {
  const history = useHistory();

  const LoginContainer = lazy(() => import('./login.container'));
  const RegistrationContainer = lazy(() => import('./registration.container'));

  useEffect(() => {
    history.push(initialRoutePathname);
    userInputsController.emit(UserInputsEvents.INIT_EVENTS);
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
