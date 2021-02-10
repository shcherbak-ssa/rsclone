import React, { useState } from 'react';
import classnames from 'classnames';

import { Icon } from '@iconify/react';
import arrowIcon from '@iconify/icons-bi/arrow-right-short';

import { SpaceColors } from '../../common/constants';
import { PageLinkTypes } from '../constants/ui.constants';
import { AssetsService } from '../services/assets.service';

const ICON_HEIGHT: number = 32;

export type PageLinkComponentProps = {
  color: SpaceColors,
  type: PageLinkTypes,
  label: string,
  title: string,
  clickHandler: Function,
};

export function PageLinkComponent({
  color, type, label, title, clickHandler,
}: PageLinkComponentProps) {
  const [componentStyles, setComponentStyles] = useState({});
  const [iconStyles, setIconStyles] = useState({});

  const componentClassnames = classnames('page-link', type);

  const iconProps = {
    icon: arrowIcon,
    height: ICON_HEIGHT,
    className: 'page-link-icon',
  };

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    clickHandler();
  }

  function handleMouseOver() {
    const hoverStyles: any = AssetsService.createHexPageLinkHoverStyles(color);

    setComponentStyles(hoverStyles);
    setIconStyles(hoverStyles);
  }

  function handleMouseLeave() {
    setComponentStyles({});
    setIconStyles({});
  }

  return (
    <div 
      className={componentClassnames}
      data-class="click"
      style={componentStyles}
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <div className="page-link-content">
        <div className="page-link-label">{label}</div>
        <div className="page-link-title">{title}</div>
      </div>
      <Icon {...iconProps} style={iconStyles}/>
    </div>
  );
}
