import React from 'react';
import './styles/app.component.scss';

type AppComponentProps = {
  children?: React.ReactNode,
};

export function AppComponent({children}: AppComponentProps) {
  return (
    <div className="app">
      <div className="app-header"></div>
      <div className="app-homepage">
        <div className="app-menu"></div>
        {children}
      </div>
    </div>
  );
}
