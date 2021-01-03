import React from 'react';
import './sidebar.scss';

import { SidebarIcon } from '../sidebar-icon';
import infoCircleOutlined from '@iconify/icons-ant-design/info-circle-outlined';
import booksIcon from '@iconify/icons-wpf/books';

export function Sidebar() {
  const iconsProps = {
    info: {
      icon: infoCircleOutlined,
      height: 18,
    },
    logo: {
      icon: booksIcon,
      width: 20,
      height: 24,
    }
  };

  return (
    <div className="sidebar" data-class="flex-column">
      <div className="sidebar-space" data-class="flex-column"></div>
      <div className="sidebar-icons" data-class="flex-column">
        <div className="sidebar-line"></div>
        <SidebarIcon {...iconsProps.info} />
        <SidebarIcon {...iconsProps.logo} />
      </div>
    </div>
  );
}
