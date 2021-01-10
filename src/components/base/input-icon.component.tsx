import React, { useState } from 'react';
import classnames from 'classnames';

import { Icon } from '@iconify/react';
import { Classnames } from '../../constants';

const ICON_HEIGHT: number = 24;

export type InputIconComponentProps = {
  icon: object,
  iconClickHandler?: Function,
};

export function InputIconComponent({icon, iconClickHandler}: InputIconComponentProps) {
  const [isIconActive, setIsIconActive] = useState(false);

  const iconClassnames = classnames('input-icon', {
    [Classnames.IS_ACTIVE]: isIconActive,
  });

  const iconProps = {
    icon, height: ICON_HEIGHT,
  };

  function iconClickHandle() {
    setIsIconActive(!isIconActive);
    iconClickHandler(!isIconActive);
  }

  return (
    <div className={iconClassnames} data-class="click" onClick={iconClickHandle}>
      <Icon {...iconProps} />
    </div> 
  );
}