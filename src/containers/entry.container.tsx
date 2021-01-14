import React, { lazy, Suspense, useEffect } from 'react';
import { Switch, useHistory } from 'react-router-dom';

import { UserInputsEvents } from '../constants/events.constants';
import { userInputsController } from '../controllers/user-inputs.controller';

type EntryContainerProps = {
  initialRoutePathname: string;
};

export function EntryContainer({initialRoutePathname}: EntryContainerProps) {
  const history = useHistory();
  const AuthContainer = lazy(() => import('./auth/auth.container'));

  useEffect(() => {
    history.push(initialRoutePathname);
    userInputsController.emit(UserInputsEvents.INIT_EVENTS);
  }, []);

  return (
    <Suspense fallback={<div>...loading</div>}>
      <Switch>
        <AuthContainer />
      </Switch>
    </Suspense>
  );
}
