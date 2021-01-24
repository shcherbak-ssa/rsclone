import React from 'react';
import classnames from 'classnames';
import './styles/space-sidebar-frame.component.scss';

import { Icon } from '@iconify/react';
import closeIcon from '@iconify/icons-eva/arrow-forward-fill';

import { Classnames, ICON_18_HEIGHT } from '../constants/ui.constants';
import { EMPTY_STRING } from '../constants/strings.constants';

export type SpaceSidebarFrameComponentProps = {
  activeSpaceSidebarActionIcon: string,
  setActiveSpaceSidebarActionIcon: Function,
  children?: React.ReactNode,
};

export function SpaceSidebarFrameComponent({
  activeSpaceSidebarActionIcon, setActiveSpaceSidebarActionIcon, children,
}: SpaceSidebarFrameComponentProps) {
  const componentClassnames = classnames('space-sidebar-frame', {
    [Classnames.SHOW_SPACE_SIDEBAR_FRAME]: !!activeSpaceSidebarActionIcon,
    [Classnames.HIDE_SPACE_SIDEBAR_FRAME]: activeSpaceSidebarActionIcon === EMPTY_STRING,
  });

  const closeIconProps = {
    icon: closeIcon,
    height: ICON_18_HEIGHT,
  };

  function handleIconClick() {
    setActiveSpaceSidebarActionIcon(EMPTY_STRING);
  }

  return (
    <div className={componentClassnames}>
      <div className="space-sidebar-frame-header">
        <div
          className="space-sidebar-frame-close-icon"
          data-class="click flex-center"
          onClick={handleIconClick}
        >
          <Icon {...closeIconProps}/>
        </div>
      </div>
      <div className="space-sidebar-frame-container">
        <div className="space-sidebar-frame-content">
          {children || EMPTY_STRING}
        </div>
      </div>
    </div>
  );
}
