import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import './spaces.scss';

import plusIcon from '@iconify/icons-ant-design/plus-outlined';

import { HomepageSectionProps, HomepageSection } from '../../containers/homepage-section';
import { storeStates } from '../../store';

export function Spaces() {
  const addSpaceKeyboadShortcut = storeStates.getAddSpaceKeyboardShortcut();

  useHotkeys(addSpaceKeyboadShortcut.keys, () => {
    console.log('Add space');
  });

  const homepageSectionProps: HomepageSectionProps = {
    title: 'Spaces',
    buttonProps: {
      icon: plusIcon,
      value: 'Add space',
      clickHandler: () => {
        console.log('Add space');
      },
    },
  };

  return (
    <HomepageSection {...homepageSectionProps}>
      <div className="spaces"></div>
    </HomepageSection>
  );
}
