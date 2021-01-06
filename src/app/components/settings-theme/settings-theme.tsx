import React from 'react';
import './settings-theme.scss';

import { AssetsService } from '../../../services/assets.service';
import { BaseRadioProps, Base } from '../base';

type SettingsThemeItemProps = {
  label: string;
  image: string;
  description: string;
  selected: string;
  selectThemeItem: (label: string) => void;
};

type SettingsThemeItemType = {
  label: string;
  image: string;
  description: string;
};

export type SettingsThemeProps = {
  selected: string;
  items: Array<SettingsThemeItemType>,
  selectItem: (label: string) => void;
};

export function SettingsTheme({selected, items, selectItem}: SettingsThemeProps) {
  function selectThemeItem(label: string) {
    selectItem(label);
  }

  return (
    <div className="settings-theme">
      {items.map((item, index) => {
        const settingsThemeItemProps: SettingsThemeItemProps = {
          ...item,
          selected,
          selectThemeItem,
        };

        return <SettingsThemeItem key={index} {...settingsThemeItemProps} />
      })}
    </div>
  );
}

function SettingsThemeItem({
  label, image, description, selected, selectThemeItem,
}: SettingsThemeItemProps) {
  const radioProps: BaseRadioProps = {
    label,
    isSelected: label === selected,
    description,
    clickHanlder: selectThemeItem,
  };

  function setBackgroundStyles() {
    const assetsService = new AssetsService();
    
    return {
      backgroundImage: `url(${assetsService.getImageUrl(image)})`,
    };
  }

  return (
    <div className="settings-theme-item">
      <div className="settings-theme-view" style={setBackgroundStyles()}></div>
      <Base.Radio {...radioProps} />
    </div>
  );
}
