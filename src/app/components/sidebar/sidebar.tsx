import React from 'react';
import { useHistory } from 'react-router-dom';
import './sidebar.scss';

import infoCircleOutlined from '@iconify/icons-ant-design/info-circle-outlined';
import booksIcon from '@iconify/icons-wpf/books';

import { AppEvents, AppRoutes, MenuItemLabels } from '../../constants';
import { SidebarIcon } from '../sidebar-icon';
import { appController } from '../../controllers/app.controller';

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
        appController.emit(AppEvents.CHANGE_MENU_ITEM, MenuItemLabels.SPACES);
        history.push(AppRoutes.ROOT);
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
