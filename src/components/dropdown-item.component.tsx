import React, { useRef } from 'react';
import './styles/dropdown-item.component.scss';

import { Icon } from '@iconify/react';
import { ICON_18_HEIGHT } from '../constants/ui.constants';
import { DropdownItem } from '../types/dropdown.types';

export type DropdownItemComponentProps = {
  item: DropdownItem,
  clickHandler: Function,
};

export function DropdownItemComponent({item, clickHandler}: DropdownItemComponentProps) {
  const linkRef = useRef(null);

  const iconProps = {
    icon: item.icon,
    height: ICON_18_HEIGHT,
    className: 'dropdown-item-icon',
  };

  function handleClick() {
    if (item.href && linkRef.current) {
      linkRef.current.click();
      clickHandler();
    } else {
      clickHandler(item.label);
    }
  }

  function drawLink() {
    return item.href ? <a href={item.href} ref={linkRef} target="_blank"></a> : '';
  }
  
  return (
    <div className="dropdown-item" data-class="click" onClick={handleClick}>
      <Icon {...iconProps}/>
      <div className="dropdown-item-text">{item.text}</div>
      {drawLink()}
    </div>
  );
}
