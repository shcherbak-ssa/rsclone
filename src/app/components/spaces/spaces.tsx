import React from 'react';
import './spaces.scss';

import plusIcon from '@iconify/icons-ant-design/plus-outlined';

import { HomepageSectionProps, HomepageSection } from '../../containers/homepage-section';

export function Spaces() {
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
