import React from 'react';
import './styles/dropdown-item.component.scss';

import { Icon } from '@iconify/react';
import { ICON_18_HEIGHT } from '../constants/ui.constants';
import { DropdownItem } from '../types/dropdown.types';

export type DropdownItemComponentProps = {
  item: DropdownItem,
  clickHandler: Function,
};

export function DropdownItemComponent({
  item, clickHandler,
}: DropdownItemComponentProps) {
  const iconProps = {
    icon: item.icon,
    height: ICON_18_HEIGHT,
    className: 'dropdown-item-icon',
  };

  function handleClick() {
    clickHandler(item.label);
  }
  
  return (
    <div className="dropdown-item" data-class="click" onClick={handleClick}>
      <Icon {...iconProps}/>
      <div className="dropdown-item-text">{item.text}</div>
    </div>
  );
}
