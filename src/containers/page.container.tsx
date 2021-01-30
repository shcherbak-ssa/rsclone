import React from 'react';

import { Page } from '../../common/entities';
import { PageComponent } from '../components/page.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { PageTitleComponent, PageTitleComponentProps } from '../components/page-title.component';
import { PageDescriptionComponent, PageDescriptionComponentProps } from '../components/page-description.component';

export type PageContainerProps = {
  activePage: Page,
  pageLanguage: any,
};

export function PageContainer({activePage, pageLanguage}: PageContainerProps) {
  const pageTitleProps: PageTitleComponentProps = {
    pageTitle: activePage.title,
    placeholder: pageLanguage.titlePlaceholder,
  };

  const pageDescriptionProps: PageDescriptionComponentProps = {
    pageDescription: activePage.description,
    placeholder: pageLanguage.descriptionPlaceholder,
  };

  return (
    <PageComponent>
      <PageHeaderComponent>
        <PageTitleComponent {...pageTitleProps}/>
        <PageDescriptionComponent {...pageDescriptionProps}/>
      </PageHeaderComponent>
    </PageComponent>
  );
}
