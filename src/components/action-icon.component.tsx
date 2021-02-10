import React, { useState } from 'react';
import classnames from 'classnames';
import './styles/action-icon.component.scss';

import { Icon } from '@iconify/react';
import { ActionIconLabels, Classnames } from '../constants/ui.constants';
import { EMPTY_STRING } from '../constants/strings.constants';
import { DropdownService } from '../services/dropdown.service';

export type ActionIconProps = {
  icon: object;
  width?: number;
  height?: number;
};

export type ActionIconComponentProps = {
  iconProps: ActionIconProps;
  description: string;
  clickHandler: Function;
  label: ActionIconLabels,
  activeActionIconLabel?: string,
  dropdownComponent?: (props: any) => JSX.Element | null,
};

export function ActionIconComponent({
  description, iconProps, clickHandler, label, activeActionIconLabel, dropdownComponent = null,
}: ActionIconComponentProps) {
  const [isActive, setIsActive] = useState(false);

  const componentClassnames = classnames('action-icon', {
    [Classnames.IS_ACTIVE]: getNextActiveState(),
  });

  function handleClick(e: React.MouseEvent) {
    clickHandler();
    setIsActive(!isActive);

    if (dropdownComponent) {
      e.stopPropagation();
      DropdownService.closeDropdowns();
    }
  }

  function getNextActiveState(): boolean {
    return activeActionIconLabel !== undefined ? label === activeActionIconLabel : isActive;
  }

  function drawDescription() {
    return description ? <div className="action-icon-description">{description}</div> : EMPTY_STRING;
  }

  function drawDropdown() {
    if (dropdownComponent) {
      return dropdownComponent({
        closeHandler: () => setIsActive(false),
      });
    }

    return EMPTY_STRING
  }

  return (
    <div
      className={componentClassnames}
      data-class="click flex-center"
      onClick={handleClick}
    >
      <Icon {...iconProps} />
      {drawDescription()}
      {drawDropdown()}
    </div>
  );
}
