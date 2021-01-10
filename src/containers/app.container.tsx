import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';

import { AppRoutePathnames } from '../constants';

type AppContainerProps = {
  initialRoutePathname: string;
};

export function AppContainer({initialRoutePathname}: AppContainerProps) {
  const history = useHistory();

  useEffect(() => {
    history.push(initialRoutePathname);
  }, []);

  return (
    <Router>
      <Switch>
        
      </Switch>
    </Router>
  );
}
