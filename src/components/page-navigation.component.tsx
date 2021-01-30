import React from 'react';

import { SpaceColors } from '../../common/constants';
import { EMPTY_STRING } from '../constants/strings.constants';
import { PageLinkTypes } from '../constants/ui.constants';
import { PageLinkComponent, PageLinkComponentProps } from './page-link.component';

export type PageLink = {
  title: string,
  clickHandler: Function,
};

export type PageNavigationComponentProps = {
  color: SpaceColors,
  pageLanguage: any,
  previousPageLink?: PageLink,
  nextPageLink?: PageLink,
};

export function PageNavigationComponent({
  color, pageLanguage, previousPageLink, nextPageLink,
}: PageNavigationComponentProps) {
  function drawPreviousPageLink() {
    if (!previousPageLink) return EMPTY_STRING;

    const previousPageLinkProps: PageLinkComponentProps = {
      color,
      type: PageLinkTypes.PREVIOUS,
      label: pageLanguage.linkLabels.previous,
      ...previousPageLink,
    };

    return <PageLinkComponent {...previousPageLinkProps}/>;
  }

  function drawNextPageLink() {
    if (!nextPageLink) return EMPTY_STRING;

    const nextPageLinkProps: PageLinkComponentProps = {
      color,
      type: PageLinkTypes.NEXT,
      label: pageLanguage.linkLabels.next,
      ...nextPageLink,
    };

    return <PageLinkComponent {...nextPageLinkProps}/>;
  }

  return (
    <div className="page-navigation">
      {drawPreviousPageLink()}
      {drawNextPageLink()}
    </div>
  );
}
