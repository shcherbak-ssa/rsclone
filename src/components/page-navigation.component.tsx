import React from 'react';

import { SpaceColors } from '../../common/constants';
import { PageLinkTypes } from '../constants/ui.constants';
import { PageLinkComponent, PageLinkComponentProps } from './page-link.component';

export type PageNavigationComponentProps = {
  color: SpaceColors,
  pageLanguage: any,
};

export function PageNavigationComponent({
  color, pageLanguage,
}: PageNavigationComponentProps) {
  const previousPageLinkProps: PageLinkComponentProps = {
    color,
    type: PageLinkTypes.PREVIOUS,
    label: pageLanguage.linkLabels.previous,
    title: 'Page title',
    clickHandler: () => {},
  };

  const nextPageLinkProps: PageLinkComponentProps = {
    color,
    type: PageLinkTypes.NEXT,
    label: pageLanguage.linkLabels.next,
    title: 'Page title',
    clickHandler: () => {},
  };

  return (
    <div className="page-navigation">
      <PageLinkComponent {...previousPageLinkProps}/>
      <PageLinkComponent {...nextPageLinkProps}/>
    </div>
  );
}
