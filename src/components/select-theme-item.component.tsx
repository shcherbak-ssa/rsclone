import React from 'react';
import './styles/select-theme.component.scss';

import { AssetsService } from '../services/assets.service';
import { BaseRadioProps, Base } from './base';

export type SelectThemeItemComponentProps = {
  label: string;
  image: string;
  description: string;
  selectedItemLabel: string;
  selectThemeItem: (label: string) => void;
};

export function SelectThemeItemComponent({
  label, image, description, selectedItemLabel, selectThemeItem,
}: SelectThemeItemComponentProps) {
  const radioProps: BaseRadioProps = {
    label,
    isSelected: label === selectedItemLabel,
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
    <div className="select-theme-item">
      <div className="select-theme-view" style={setBackgroundStyles()}></div>
      <Base.Radio {...radioProps} />
    </div>
  );
}
