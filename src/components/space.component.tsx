import React from 'react';
import classnames from 'classnames';
import './styles/space.component.scss';

import { Icon } from '@iconify/react';
import threeDots from '@iconify/icons-bi/three-dots';

import { Space } from '../../common/entities';
import { SpaceColors } from '../../common/constants';
import { Classnames, ICON_18_HEIGHT } from '../constants/ui.constants';
import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';
import { DropdownComponentProps, DropdownComponent } from './dropdown.component';

export type SpaceComponentProps = {
  space: Space,
  dropdownProps: DropdownComponentProps | null,
  iconClickHandler: Function,
  clickHandler: Function,
};

export function SpaceComponent({
  space, dropdownProps, iconClickHandler, clickHandler,
}: SpaceComponentProps) {
  const spaceLogoProps: SpaceLogoComponentProps = {
    color: space.color as SpaceColors,
    logo: space.logo,
  };

  const spaceIconClassnames = classnames('space-icon', {
    [Classnames.IS_ACTIVE]: dropdownProps !== null,
  });

  function handleClick() {
    clickHandler();
  }

  function handleIconClick(e: React.MouseEvent) {
    e.stopPropagation();
    iconClickHandler();
  }

  function dropDropdown() {
    return dropdownProps === null ? '' : <DropdownComponent {...dropdownProps}/>
  }

  return (
    <div className="space" data-class="click shadow" onClick={handleClick}>
      <div className="space-header">
        <SpaceLogoComponent {...spaceLogoProps}/>
        <div className="space-title">{space.name}</div>
      </div>
      <div className="space-line"></div>
      <div className="space-footer">
        <div className="space-date"></div>
        <div
          className={spaceIconClassnames}
          data-class="click flex-center"
          onClick={handleIconClick}
        >
          <Icon icon={threeDots} height={ICON_18_HEIGHT}/>
          {dropDropdown()}
        </div>
      </div>
    </div>
  );
}
