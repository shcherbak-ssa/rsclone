import React from 'react';
import './sidebar-icon.scss';
import { Icon } from '@iconify/react';

type SidebarIconProps = {
  iconProps: {
    icon: object,
    width?: number,
    height?: number,
  },
  clickHandler: () => void,
};

export function SidebarIcon({
  iconProps, clickHandler,
}: SidebarIconProps) {
  return (
    <div
      className="sidebar-icon"
      data-class="click flex-center"
      onClick={clickHandler}
    >
      <Icon {...iconProps} />
    </div>
  );
}
