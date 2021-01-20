import React from 'react';
import './styles/dropdown.component.scss';

import { DropdownItem } from '../types/dropdown.types';
import { DropdownItemComponent, DropdownItemComponentProps } from './dropdown-item.component';

export type DropdownComponentProps = {
  items: DropdownItem[],
  itemClickHandler: Function,
};

export function DropdownComponent({items, itemClickHandler}: DropdownComponentProps) {
  function drawItems() {
    return items.map((item, index) => {
      const dropdownItemProps: DropdownItemComponentProps = {
        item,
        clickHandler: itemClickHandler,
      };

      return <DropdownItemComponent key={index} {...dropdownItemProps}/>;
    });
  }
  
  return <div className="dropdown" data-class="shadow">{drawItems()}</div>;
}
