import React from 'react';
import './styles/sidebar.component.scss';

import { ActionIconComponentProps, ActionIconComponent } from './action-icon.component';
import { actionSidebarIconLabels } from '../data/action-icon.data';
import { useActionIconProps } from '../hooks/action-icon-props.hook';

export function SidebarComponent() {
  const actionIconComponentsProps: ActionIconComponentProps[] = useActionIconProps({
    icons: actionSidebarIconLabels,
  });

  function drawActionIcons() {
    return actionIconComponentsProps.map((actionIconComponentProps, index) => {
      return <ActionIconComponent key={index} {...actionIconComponentProps} />;
    });
  }

  return (
    <div className="sidebar" data-class="flex-column">
      <div className="sidebar-space" data-class="flex-column"></div>
      <div className="sidebar-icons" data-class="flex-column">
        <div className="sidebar-line"></div>
        {drawActionIcons()}
      </div>
    </div>
  );
}