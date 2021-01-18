import React from 'react';
import './styles/app.component.scss';

import { MenuContainer } from '../containers/menu.container';
import { SidebarComponent } from './sidebar.component';

type AppComponentProps = {
  children?: React.ReactNode,
};

export function AppComponent({children}: AppComponentProps) {
  return (
    <div className="app">
      <div className="app-header"></div>
      <SidebarComponent />
      <div className="app-homepage">
        <div className="app-menu"></div>
        <MenuContainer />
        {children}
      </div>
    </div>
  );
}
