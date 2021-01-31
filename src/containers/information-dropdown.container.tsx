import React, { useEffect, useState } from 'react';

import { DropdownComponent, DropdownComponentProps } from '../components/dropdown.component';
import { DropdownNames } from '../constants/ui.constants';
import { DropdownService } from '../services/dropdown.service';
import { DropdownItem } from '../types/dropdown.types';

type InformationDropdownContainerProps = {
  closeHandler: () => void,
};

export function InformationDropdownContainer({closeHandler}: InformationDropdownContainerProps) {
  const [isInformationDropdownOpen, setIsInformationDropdownOpen] = useState(false);

  const informationDropdownItems: DropdownItem[] = [];

  const informationDropdownProps: DropdownComponentProps = {
    items: informationDropdownItems,
    itemClickHandler: () => {
      setIsInformationDropdownOpen(false);
      closeHandler();
    },
    dropdownName: DropdownNames.INFORMATION,
  };

  useEffect(() => {
    DropdownService.subscribeDropdownForOpen(DropdownNames.INFORMATION, () => {
      setIsInformationDropdownOpen(true);
    });
  }, []);

  return isInformationDropdownOpen ? <DropdownComponent {...informationDropdownProps}/> : null;
}
