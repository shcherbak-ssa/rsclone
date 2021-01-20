import React, { useState } from 'react';

import settingsIcon from '@iconify/icons-clarity/settings-line';
import deleteIcon from '@iconify/icons-ic/baseline-delete-forever';

import { Space } from '../../common/entities';
import { DropdownComponentProps } from '../components/dropdown.component';
import { SpaceComponent, SpaceComponentProps } from '../components/space.component';
import { DropdownItemLabels } from '../constants';
import { useAppLanguage } from '../hooks/app-language.hook';

export type SpaceContainerProps = {
  space: Space
};

export function SpaceContainer({space}: SpaceContainerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const appLanguage = useAppLanguage();

  const dropdownProps: DropdownComponentProps = {
    items: [
      {
        icon: settingsIcon,
        text: appLanguage.dropdowns[DropdownItemLabels.SETTINGS_SPACE],
        label: DropdownItemLabels.SETTINGS_SPACE,
      },
      {
        icon: deleteIcon,
        text: appLanguage.dropdowns[DropdownItemLabels.DELETE_SPACE],
        label: DropdownItemLabels.DELETE_SPACE,
      },
    ],
    itemClickHandler: (label?: DropdownItemLabels) => {
      console.log(label);
    },
  };

  const spaceProps: SpaceComponentProps = {
    space,
    dropdownProps: isDropdownOpen ? dropdownProps : null,
    iconClickHandler: () => {
      setIsDropdownOpen(!isDropdownOpen);
    },
  };
  
  return <SpaceComponent {...spaceProps}/>;
}
