import React from 'react';
import classnames from 'classnames';
import './app-container.scss';

import { Sidebar } from '../../components/sidebar';
import { Menu } from '../../components/menu';

export type AppContainerProps = {
  theme: string;
};

export function AppContainer({theme}: AppContainerProps) {
  const componentClassnames = classnames('app', theme);

  return (
    <div className={componentClassnames}>
      <Sidebar />
      <Menu />
    </div>
  );
}
