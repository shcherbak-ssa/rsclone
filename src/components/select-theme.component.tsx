import React from 'react';
import './styles/select-theme.component.scss';

import { SelectItemTheme } from '../types/select-item.types';
import { SelectThemeItemComponent, SelectThemeItemComponentProps } from './select-theme-item.component';

export type SelectThemeComponentProps = {
  selectedItemLabel: string;
  items: SelectItemTheme[],
  updateSelectedItem: (label: string) => void;
};

export function SelectThemeComponent(
  {selectedItemLabel, items, updateSelectedItem}: SelectThemeComponentProps
) {
  function selectThemeItem(label: string) {
    updateSelectedItem(label);
  }

  function drawItems() {
    return items.map((item, index) => {
      const settingsThemeItemProps: SelectThemeItemComponentProps = {
        ...item,
        selectedItemLabel,
        selectThemeItem,
      };

      return <SelectThemeItemComponent key={index} {...settingsThemeItemProps} />
    });
  }

  return (
    <div className="select-theme">
      {drawItems()}
    </div>
  );
}
