import React, { useEffect } from 'react';
import './styles/dropdown.component.scss';

import { DropdownItem } from '../types/dropdown.types';
import { DropdownItemComponent, DropdownItemComponentProps } from './dropdown-item.component';
import { DropdownNames } from '../constants/ui.constants';
import { DropdownService } from '../services/dropdown.service';

export type DropdownComponentProps = {
  items: DropdownItem[],
  itemClickHandler: Function,
  dropdownName?: DropdownNames,
};

export function DropdownComponent({
  items, itemClickHandler, dropdownName
}: DropdownComponentProps) {
  useEffect(() => {
    if (dropdownName) {
      const dropdownService: DropdownService = new DropdownService();
      dropdownService.subscribeDropdown(dropdownName, itemClickHandler);

      return () => {
        dropdownService.unsubscribeDropdown(dropdownName);
      };
    }
  }, []);

  function drawItems() {
    return items.map((item, index) => {
      const dropdownItemProps: DropdownItemComponentProps = {
        item,
        clickHandler: itemClickHandler,
      };

      return <DropdownItemComponent key={index} {...dropdownItemProps}/>;
    });
  }
  
  return (
    <div className="dropdown" data-class="shadow">
      {drawItems()}
      <div className="dropdown-arrow"></div>
    </div>
  );
}
