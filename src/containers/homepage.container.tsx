import React from 'react';
import plusIcon from '@iconify/icons-ant-design/plus-outlined';

import { HomepageSectionLabels } from '../constants';
import { BaseButtonProps } from '../components/base';
import {
  HomepageSectionComponent,
  HomepageSectionComponentProps,
} from '../components/homepage-section.component';
import { useAppLanguage } from '../hooks/app-language.hook';

export type HomepageContainerProps = {
  sectionLabel: HomepageSectionLabels,
  buttonClickHandler?: Function,
};

export function HomepageContainer({sectionLabel, buttonClickHandler}: HomepageContainerProps) {
  const appLanguage = useAppLanguage();

  const homepageSectionProps: HomepageSectionComponentProps = {
    title: appLanguage.homepage[sectionLabel].title,
    ...setBaseButtonProps(),
  };

  function setBaseButtonProps(): {buttonProps: BaseButtonProps} | {} {
    if (!buttonClickHandler) return {};

    return {
      buttonProps: {
        icon: plusIcon,
        value: appLanguage.homepage[sectionLabel].buttonValue,
        clickHandler: buttonClickHandler,
      },
    };
  }

  return (
    <HomepageSectionComponent {...homepageSectionProps}>
      
    </HomepageSectionComponent>
  );
}
