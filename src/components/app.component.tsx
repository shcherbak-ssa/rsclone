import React from 'react';
import { Switch } from 'react-router-dom';
import './styles/app.component.scss';

import { MenuContainer } from '../containers/menu.container';

export function AppComponent() {
  return (
    <div className="app">
      <div className="app-header"></div>
      <MenuContainer />
      <div className="app-homepage">
        <div className="app-menu"></div>
        <Switch>
        </Switch>
      </div>
    </div>
  );
}
