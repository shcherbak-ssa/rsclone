import React from 'react';
import './sidebar-icon.scss';
import { Icon } from '@iconify/react';

type SidebarIconProps = {
  icon: object,
  width?: number,
  height?: number,
};

export function SidebarIcon(props: SidebarIconProps) {
  return (
    <div className="sidebar-icon" data-class="flex-center">
      <Icon {...props} />
    </div>
  );
}
