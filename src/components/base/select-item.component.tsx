import React from 'react';
import classnames from 'classnames';

import { Classnames } from '../../constants/ui.constants';

export type SelectItemType = {
  label: string;
  value: string;
};

export type SelectItemComponentProps = {
  item: SelectItemType,
  selected: SelectItemType,
  clickHandler: (label: string) => void,
};

export function SelectItemComponent({
  item, selected, clickHandler,
}: SelectItemComponentProps) {
  const componentClassname = classnames('select-item', {
    [Classnames.IS_SELECTED]: item.label === selected.label,
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