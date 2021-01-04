import React from 'react';
import './spaces.scss';

import { HomepageSectionProps, HomepageSection } from '../../containers/homepage-section';

export function Spaces() {
  const homepageSectionProps: HomepageSectionProps = {
    title: 'Spaces',
  };

  return (
    <HomepageSection {...homepageSectionProps}>
      <div className="spaces"></div>
    </HomepageSection>
  );
}
