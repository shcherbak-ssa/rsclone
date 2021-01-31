import React from 'react';
import './styles/sidebar.component.scss';

import { ActionIconComponentProps, ActionIconComponent } from './action-icon.component';
import { actionSidebarIconLabels } from '../data/action-icon.data';
import { useActionIconProps } from '../hooks/action-icon-props.hook';
import { ActionIconLabels } from '../constants/ui.constants';
import { InformationDropdownContainer } from '../containers/information-dropdown.container';

type SidebarComponentProps = {
  children?: React.ReactNode,
};

export function SidebarComponent({children}: SidebarComponentProps) {
  const actionIconComponentsProps: ActionIconComponentProps[] = useActionIconProps({
    icons: actionSidebarIconLabels,
    iconPayloads: {
      [ActionIconLabels.INFO]: {
        dropdownComponent: InformationDropdownContainer,
      },
    },
  });

  function drawActionIcons() {
    return actionIconComponentsProps.map((actionIconComponentProps, index) => {
      return <ActionIconComponent key={index} {...actionIconComponentProps} />;
    });
  }

  return (
    <div className="sidebar" data-class="flex-column">
      <div className="sidebar-space" data-class="flex-column">
        {children}
      </div>
      <div className="sidebar-icons" data-class="flex-column">
        <div className="sidebar-line"></div>
        {drawActionIcons()}
      </div>
    </div>
  );
}
