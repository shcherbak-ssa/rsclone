import React, { useEffect, useState } from 'react';

import githubIcon from '@iconify/icons-ant-design/github-filled';
import gitbookIcon from '@iconify/icons-simple-icons/gitbook';
import figmaIcon from '@iconify/icons-bx/bxl-figma';
import codeIcon from '@iconify/icons-bi/code-slash';
import articleIcon from '@iconify/icons-ic/outline-article';

import { DropdownComponent, DropdownComponentProps } from '../components/dropdown.component';
import { DropdownNames } from '../constants/ui.constants';
import { DropdownService } from '../services/dropdown.service';
import { DropdownItem } from '../types/dropdown.types';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';

type InformationDropdownContainerProps = {
  closeHandler: () => void,
};

export function InformationDropdownContainer({closeHandler}: InformationDropdownContainerProps) {
  const informationLanguage = useLanguagePart(LanguageParts.ASSETS).information;
  const [isInformationDropdownOpen, setIsInformationDropdownOpen] = useState(false);

  const informationDropdownItems: DropdownItem[] = [
    {
      icon: gitbookIcon,
      text: informationLanguage.original,
      href: 'https://www.gitbook.com/',
    },
    {
      icon: githubIcon,
      text: informationLanguage.author,
      href: 'https://github.com/shcherbak-ssa',
    },
    {
      icon: codeIcon,
      text: informationLanguage.rsschool,
      href: 'https://rs.school/js/',
    },
    {
      icon: figmaIcon,
      text: informationLanguage.design,
      href: 'https://www.figma.com/file/GeEYptFLwavV7HMJcGyIn2/Gitbook-Clone',
    },
    {
      icon: articleIcon,
      text: informationLanguage.article,
      href: 'https://shcherbak.gitbook.io/gitbook-clone/article',
    },
  ];

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
