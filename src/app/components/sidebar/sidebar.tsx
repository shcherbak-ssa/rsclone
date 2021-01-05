import React from 'react';
import { useHistory } from 'react-router-dom';
import './sidebar.scss';

import infoCircleOutlined from '@iconify/icons-ant-design/info-circle-outlined';
import booksIcon from '@iconify/icons-wpf/books';

import { SidebarIcon } from '../sidebar-icon';

export function Sidebar() {
  const history = useHistory();

  const iconsProps = {
    info: {
      iconProps: {
        icon: infoCircleOutlined,
        height: 18,
      },
      clickHandler: () => {},
    },
    logo: {
      iconProps: {
        icon: booksIcon,
        width: 20,
        height: 24,
      },
      clickHandler: () => {
        location.replace(location.origin);
      },
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
