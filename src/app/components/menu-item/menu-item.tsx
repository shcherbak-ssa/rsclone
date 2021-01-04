import React from 'react';
import classnames from 'classnames';
import './menu-item.scss';

import { Icon } from '@iconify/react';
import { IS_ACTIVE_CLASSNAME } from '../../constants';

const ICON_HEIGHT: number = 18;

type MenuItemProps = {
  icon: object,
  text: string,
  isActive?: boolean,
};

export function MenuItem({
  icon, text, isActive,
}: MenuItemProps) {
  const componentClassnames = classnames('menu-item', {
    [IS_ACTIVE_CLASSNAME]: isActive,
  });

  return (
    <div className={componentClassnames} data-class="click">
      <Icon icon={icon} className="menu-item-icon" height={ICON_HEIGHT} />
      <div className="menu-item-text">{text}</div>
    </div>
  );
}
