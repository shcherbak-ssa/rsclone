import React from 'react';

import { Page, Space } from '../../common/entities';
import { SpaceColors } from '../../common/constants';
import { PageComponent } from '../components/page.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { PageTitleComponent, PageTitleComponentProps } from '../components/page-title.component';
import { PageDescriptionComponent, PageDescriptionComponentProps } from '../components/page-description.component';
import { PageContentComponent } from '../components/page-content.component';
import { PageFooterComponent } from '../components/page-footer.component';
import { PageNavigationComponent, PageNavigationComponentProps } from '../components/page-navigation.component';

export type PageContainerProps = {
  activeSpace: Space,
  activePage: Page,
  pageLanguage: any,
};

export function PageContainer({activeSpace, activePage, pageLanguage}: PageContainerProps) {
  const pageTitleProps: PageTitleComponentProps = {
    pageTitle: activePage.title,
    placeholder: pageLanguage.titlePlaceholder,
  };

  const pageDescriptionProps: PageDescriptionComponentProps = {
    pageDescription: activePage.description,
    placeholder: pageLanguage.descriptionPlaceholder,
  };

  const pageNavigationProps: PageNavigationComponentProps = {
    color: activeSpace.color as SpaceColors,
    pageLanguage,
  };

  return (
    <PageComponent>
      <PageHeaderComponent>
        <PageTitleComponent {...pageTitleProps}/>
        <PageDescriptionComponent {...pageDescriptionProps}/>
      </PageHeaderComponent>
      <PageContentComponent></PageContentComponent>
      <PageFooterComponent>
        <PageNavigationComponent {...pageNavigationProps}/>
      </PageFooterComponent>
    </PageComponent>
  );
}
