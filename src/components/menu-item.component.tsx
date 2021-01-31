import React from 'react';
import classnames from 'classnames';
import './styles/menu-item.component.scss';

import { Icon } from '@iconify/react';
import { Classnames } from '../constants/ui.constants';

const ICON_HEIGHT: number = 18;

export type MenuItemComponentProps = {
  icon: object,
  text: string,
  isActive?: boolean,
  clickHandler: () => void,
};

export function MenuItemComponent({icon, text, isActive, clickHandler}: MenuItemComponentProps) {
  const componentClassnames: string = classnames('menu-item', {
    [Classnames.IS_ACTIVE]: isActive,
  });

  return (
    <div className={componentClassnames} data-class="click" onClick={clickHandler}>
      <Icon icon={icon} className="menu-item-icon" height={ICON_HEIGHT} />
      <div className="menu-item-text">{text}</div>
    </div>
  );
}
