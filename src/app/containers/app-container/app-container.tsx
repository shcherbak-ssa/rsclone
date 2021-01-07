import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app-container.scss';

import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';
import { Spaces } from '../../components/spaces';
import { Settings } from '../../components/settings';
import { storeSelectors } from '../../store';
import { AppRoutesService } from '../../../services/app-routes.service';
import { Popup } from '../popup';

export function AppContainer() {
  const theme = useSelector(storeSelectors.user.getCurrentTheme());

  const appRoutesService: AppRoutesService = new AppRoutesService();

  useEffect(() => {
    document.body.classList.add(theme);

    return () => {
      document.body.classList.remove(theme);
    };
  }, [theme]);

  return (
    <div className="app">
      <Router>
        <Sidebar />
        <div className="app-homepage">
          <div className="app-menu"></div>
          <Menu />
          <Popup />
          <Switch>
            <Route path={appRoutesService.getRootRoutePath()} exact component={Spaces} />
            <Route path={appRoutesService.getSpacesRoutePath()} component={Spaces} />
            <Route path={appRoutesService.getSettingsRoutePath()} component={Settings} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
