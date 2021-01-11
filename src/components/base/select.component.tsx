import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/select.component.scss';

import Icon from '@iconify/react';
import arrowIcon from '@iconify/icons-eva/arrow-ios-downward-fill';

import { Classnames } from '../../constants';
import {
  SelectItemComponent,
  SelectItemComponentProps,
  SelectItemType,
} from './select-item.component';

const ICON_HEIGHT: number = 28;

export type BaseSelectProps = {
  placeholder: string;
  selected: SelectItemType;
  items: Array<SelectItemType>,
  updateSelectedItem: (label: string) => void,
};

export function SelectComponent({
  placeholder, selected, items, updateSelectedItem,
}: BaseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const componentClassname = classnames('select', {
    [Classnames.IS_OPEN]: isOpen,
  });

  const iconProps = {
    icon: arrowIcon,
    className: 'select-icon',
    height: ICON_HEIGHT,
  };

  function clickHandle() {
    setIsOpen(!isOpen);
  }

  function selectItemClickHandler(label: string) {
    setIsOpen(false);
    updateSelectedItem(label);
  }

  function drawSelectItems() {
    return items.map((item, index) => {
      const selectItemProps: SelectItemComponentProps = {
        item, selected, clickHandler: selectItemClickHandler,
      };

      return <SelectItemComponent key={index} {...selectItemProps} />
    })
  }

  return (
    <div className={componentClassname}>
      <div className="select-selected" data-class="click shadow" onClick={clickHandle}>
        <div className="select-placeholder">{placeholder}</div>
        <Icon {...iconProps} />
        {selected.value}
      </div>
      <div className="select-items" data-class="shadow">
        {drawSelectItems()}
      </div>
    </div>
  );
}