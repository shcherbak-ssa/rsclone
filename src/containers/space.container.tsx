import React, { useState } from 'react';

import settingsIcon from '@iconify/icons-clarity/settings-line';
import deleteIcon from '@iconify/icons-ic/baseline-delete-forever';

import { Space } from '../../common/entities';
import { DropdownComponentProps } from '../components/dropdown.component';
import { SpaceComponent, SpaceComponentProps } from '../components/space.component';
import { DropdownItemLabels } from '../constants';
import { useAppLanguage } from '../hooks/app-language.hook';
import { PopupService } from '../services/popup.service';
import { DropdownNames, PopupNames } from '../constants/ui.constants';
import { useOpenSpacePage } from '../hooks/open-space-page.hook';
import { useSetActiveSpace } from '../hooks/set-active-space.hook';
import { DropdownService } from '../services/dropdown.service';

export type SpaceContainerProps = {
  space: Space,
};

export function SpaceContainer({space}: SpaceContainerProps) {
  const appLanguage = useAppLanguage();
  const setActiveSpace = useSetActiveSpace();
  const openSpacePage = useOpenSpacePage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
      switch (label) {
        case DropdownItemLabels.SETTINGS_SPACE:
          openSpacePopup(PopupNames.UPDATE_SPACE);
          break;
        case DropdownItemLabels.DELETE_SPACE:
          openSpacePopup(PopupNames.DELETE_SPACE);
          break;
        default:
          setIsDropdownOpen(false);
      }
    },
    dropdownName: DropdownNames.SPACE,
  };

  const spaceProps: SpaceComponentProps = {
    space,
    dropdownProps: isDropdownOpen ? dropdownProps : null,
    iconClickHandler: () => {
      DropdownService.closeDropdowns();
      setIsDropdownOpen(!isDropdownOpen);
    },
    clickHandler: () => {
      setActiveSpace(space, () => {
        openSpacePage(space);
      });
    },
  };

  function openSpacePopup(popupName: PopupNames) {
    setActiveSpace(space, () => {
      const popupService: PopupService = new PopupService();
      popupService.openPopup(popupName);
    });
  }
  
  return <SpaceComponent {...spaceProps}/>;
}
