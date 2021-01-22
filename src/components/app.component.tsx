import React from 'react';
import classnames from 'classnames';
import './styles/app.component.scss';
import { Classnames } from '../constants/ui.constants';

export type AppComponentProps = {
  isOpenSpacePage: boolean,
  children?: React.ReactNode,
};

export function AppComponent({
  isOpenSpacePage, children,
}: AppComponentProps) {
  const componentClassnames = classnames('app', {
    [Classnames.IS_SPACE_PAGE_OPEN]: isOpenSpacePage,
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
