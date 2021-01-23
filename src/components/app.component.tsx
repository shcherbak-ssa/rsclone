import React from 'react';
import classnames from 'classnames';
import './styles/app.component.scss';
import { Classnames } from '../constants/ui.constants';

export type AppComponentProps = {
  isSpacePageOpen: boolean,
  children?: React.ReactNode,
};

export function AppComponent({
  isSpacePageOpen, children,
}: AppComponentProps) {
  const componentClassnames = classnames('app', {
    [Classnames.IS_SPACE_PAGE_OPEN]: isSpacePageOpen,
  });

  return (
    <div className={componentClassnames}>
      <div className="app-header"></div>
      <div className="app-homepage">
        <div className="app-menu"></div>
        {children}
      </div>
    </div>
  );
}
