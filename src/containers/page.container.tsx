import React from 'react';

import { PageComponent } from '../components/page.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { PageTitleComponent, PageTitleComponentProps } from '../components/page-title.component';
import { Page } from '../../common/entities';

export type PageContainerProps = {
  activePage: Page,
};

export function PageContainer({activePage}: PageContainerProps) {
  const pageTitleProps: PageTitleComponentProps = {
    pageTitle: activePage.title,
  };

  return (
    <PageComponent>
      <PageHeaderComponent>
        <PageTitleComponent {...pageTitleProps}/>
      </PageHeaderComponent>
    </PageComponent>
  );
}
