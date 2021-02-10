import React from 'react';
import classnames from 'classnames';
import './styles/space-color.component.scss';

import { Icon } from '@iconify/react';
import checkIcon from '@iconify/icons-feather/check';

import { SpaceColors } from '../../common/constants';
import { Classnames, ICON_18_HEIGHT } from '../constants/ui.constants';
import { AssetsService } from '../services/assets.service';

export type SpaceColorComponentProps = {
  activeColor: SpaceColors,
  color: SpaceColors,
  setActiveColor: Function,
};

export function SpaceColorComponent({
  activeColor, color, setActiveColor,
}: SpaceColorComponentProps) {
  const componentClassnames = classnames('space-color', {
    [Classnames.IS_ACTIVE]: activeColor === color,
  });

  const checkIconProps = {
    className: 'space-color-icon',
    icon: checkIcon,
    height: ICON_18_HEIGHT,
  };

  function setBackgroundColorStyle() {
    return AssetsService.createHexBackgroundColorStyle(color);
  }

  function handleClick() {
    setActiveColor(color);
  }

  return (
    <div 
      className={componentClassnames} 
      data-class="flex-center click"
      style={setBackgroundColorStyle()}
      onClick={handleClick}
    >
      <Icon {...checkIconProps}/>
    </div>
  );
}
