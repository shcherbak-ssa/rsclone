import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import './app-container.scss';

import { AppRoutes } from '../../constants';
import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';
import { Spaces } from '../../components/spaces';
import { Settings } from '../../components/settings';

export type AppContainerProps = {
  theme: string;
};

export function AppContainer({theme}: AppContainerProps) {
  const componentClassnames = classnames('app', theme);

  return (
    <div className={componentClassnames}>
      <Router>
        <Sidebar />
        <Menu />
        <Switch>
          <Route path={AppRoutes.ROOT} exact component={Spaces} />
          <Route path={AppRoutes.SETTINGS} component={Settings} />
        </Switch>
      </Router>
    </div>
  );
}
