import React from 'react';

import { Page, Space } from '../../common/entities';
import { SpaceColors } from '../../common/constants';
import { PageComponent } from '../components/page.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { PageTitleComponent, PageTitleComponentProps } from '../components/page-title.component';
import { PageDescriptionComponent, PageDescriptionComponentProps } from '../components/page-description.component';
import { PageContentComponent } from '../components/page-content.component';
import { PageFooterComponent } from '../components/page-footer.component';
import { PageLink, PageNavigationComponent, PageNavigationComponentProps } from '../components/page-navigation.component';
import { EMPTY_STRING } from '../constants/strings.constants';

const ONLY_ONE_PAGE_LENGTH: number = 1;
const FIRST_PAGE_INDEX: number = 0;
const INCREMENT: number = 1;

export type PageContainerProps = {
  activeSpace: Space,
  activePage: Page,
  pageLanguage: any,
  pageTitles: string[],
  setActivePage: Function,
};

export function PageContainer({
  activeSpace, activePage, pageLanguage, pageTitles, setActivePage,
}: PageContainerProps) {
  const pageIDs = activeSpace.pages;

  const pageTitleProps: PageTitleComponentProps = {
    pageTitle: activePage.title,
    placeholder: pageLanguage.titlePlaceholder,
    activePageID: activePage.id,
    newPageTitle: pageLanguage.newPageTitle,
  };

  const pageDescriptionProps: PageDescriptionComponentProps = {
    pageDescription: activePage.description,
    placeholder: pageLanguage.descriptionPlaceholder,
    activePageID: activePage.id,
  };

  function drawPageNavigation() {
    if (pageIDs.length === ONLY_ONE_PAGE_LENGTH) return EMPTY_STRING;

    const pageNavigationProps: PageNavigationComponentProps = {
      color: activeSpace.color as SpaceColors,
      pageLanguage,
      ...getPageLinks(),
    };

    return <PageNavigationComponent {...pageNavigationProps}/>;
  }

  function getPageLinks(): {
    previousPageLink: PageLink | undefined,
    nextPageLink: PageLink | undefined,
  } {
    const activePageIDIndex: number = findActivePageIDIndex();
    const previousPageIDIndex: number = activePageIDIndex - INCREMENT;
    const nextPageIDIndex: number = activePageIDIndex + INCREMENT;

    if (activePageIDIndex === FIRST_PAGE_INDEX) {
      return {
        previousPageLink: undefined,
        nextPageLink: getPageLink(nextPageIDIndex),
      };
    }

    if (activePageIDIndex === pageIDs.length - INCREMENT) {
      return {
        previousPageLink: getPageLink(previousPageIDIndex),
        nextPageLink: undefined,
      };
    }

    return {
      previousPageLink: getPageLink(previousPageIDIndex),
      nextPageLink: getPageLink(nextPageIDIndex),
    };
  }

  function findActivePageIDIndex(): number {
    return pageIDs.findIndex((pageID) => pageID === activePage.id);
  }

  function getPageLink(pageIDIndex: number): PageLink {
    return {
      title: pageTitles[pageIDIndex],
      clickHandler: () => {
        setActivePage(pageIDs[pageIDIndex]);
      },
    }
  }

  return (
    <PageComponent>
      <PageHeaderComponent>
        <PageTitleComponent {...pageTitleProps}/>
        <PageDescriptionComponent {...pageDescriptionProps}/>
      </PageHeaderComponent>
      <PageContentComponent></PageContentComponent>
      <PageFooterComponent>
        {drawPageNavigation()}
      </PageFooterComponent>
    </PageComponent>
  );
}
