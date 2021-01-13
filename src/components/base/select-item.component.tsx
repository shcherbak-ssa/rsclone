import React from 'react';
import classnames from 'classnames';

import { Classnames } from '../../constants/ui.constants';
import { SelectItemType } from '../../types/select-item.types';

export type SelectItemComponentProps = {
  item: SelectItemType,
  selectedItemLabel: string,
  clickHandler: (label: string) => void,
};

export function SelectItemComponent({
  item, selectedItemLabel, clickHandler,
}: SelectItemComponentProps) {
  const componentClassname = classnames('select-item', {
    [Classnames.IS_SELECTED]: item.label === selectedItemLabel,
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