import React from 'react';
import './menu-item.scss';

import { Icon } from '@iconify/react';

const ICON_HEIGHT: number = 18;

type MenuItemProps = {
  icon: object,
  text: string,
};

export function MenuItem({icon, text}: MenuItemProps) {
  return (
    <div className="menu-item" data-class="click">
      <Icon icon={icon} className="menu-item-icon" height={ICON_HEIGHT} />
      <div className="menu-item-text">{text}</div>
    </div>
  );
}
