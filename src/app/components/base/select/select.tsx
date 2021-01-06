import React, { useState } from 'react';
import classnames from 'classnames';
import './select.scss';

import Icon from '@iconify/react';
import arrowIcon from '@iconify/icons-eva/arrow-ios-downward-fill';
import { IS_OPEN_CLASSNAME } from '../../../constants';

const ICON_SIZE: number = 28;
const IS_SELECTED_CLASSNAME: string = 'is-selected';

type SelectItemType = {
  label: string;
  value: string;
};

type SelectItemProps = {
  item: SelectItemType,
  selected: SelectItemType,
  clickHandler: (label: string) => void,
};

export type BaseSelectProps = {
  placeholder: string;
  selected: SelectItemType;
  items: Array<SelectItemType>,
  updateSelectedItem: (label: string) => void,
};

export function Select({
  placeholder, selected, items, updateSelectedItem,
}: BaseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const componentClassname = classnames('select', {
    [IS_OPEN_CLASSNAME]: isOpen,
  });

  const iconProps = {
    icon: arrowIcon,
    className: 'select-icon',
    height: ICON_SIZE,
  };

  function clickHandle() {
    setIsOpen(!isOpen);
  }

  function selectItemClickHandler(label: string) {
    setIsOpen(false);
    updateSelectedItem(label);
  }

  return (
    <div className={componentClassname}>
      <div className="select-selected" data-class="click" onClick={clickHandle}>
        <div className="select-placeholder">{placeholder}</div>
        <Icon {...iconProps} />
        {selected.value}
      </div>
      <div className="select-items" data-class="shadow">
        {items.map((item, index) => {
          const selectItemProps: SelectItemProps = {
            item, selected, clickHandler: selectItemClickHandler,
          };
          return <SelectItem key={index} {...selectItemProps} />
        })}
      </div>
    </div>
  );
}

function SelectItem({item, selected, clickHandler}: SelectItemProps) {
  const componentClassname = classnames('select-item', {
    [IS_SELECTED_CLASSNAME]: item.label === selected.label,
  });

  function clickHandle() {
    clickHandler(item.label);
  }

  return (
    <div className={componentClassname} data-class="click" onClick={clickHandle}>
      {item.value}
    </div>
  );
}
