import React from 'react';

import { Page } from '../../common/entities';
import { PageListItemComponent, PageListItemComponentProps } from './page-list-item.component';

export type PageListComponentProps = {
  color: string,
  pageTitles: string[],
  pageIDs: string[],
  activePage: Page | null,
  setActivePage: Function,
};

export function PageListComponent({
  color, pageTitles, pageIDs, activePage, setActivePage,
}: PageListComponentProps) {
  if (activePage === null) return <div>Loading...</div>;

  function drawPageListItems() {
    return pageIDs.map((pageID, index) => {
      const pageListItemProps: PageListItemComponentProps = {
        color,
        pageID,
        pageTitle: pageTitles[index],
        activePage,
        setActivePage,
      };

      return <PageListItemComponent key={pageID} {...pageListItemProps}/>
    });
  }

  return (
    <div className="page-list">
      {drawPageListItems()}
    </div>
  );
}
