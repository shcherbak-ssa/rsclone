import React from 'react';
import './styles/select-theme.component.scss';
import { SelectThemeItemComponent, SelectThemeItemComponentProps } from './select-theme-item.component';

type SettingsThemeItemType = {
  label: string;
  image: string;
  description: string;
};

export type SelectThemeComponentProps = {
  selected: string;
  items: SettingsThemeItemType[],
  selectItem: (label: string) => void;
};

export function SelectThemeComponent({selected, items, selectItem}: SelectThemeComponentProps) {
  function selectThemeItem(label: string) {
    selectItem(label);
  }

  function drawItems() {
    return items.map((item, index) => {
      const settingsThemeItemProps: SelectThemeItemComponentProps = {
        ...item,
        selected,
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
