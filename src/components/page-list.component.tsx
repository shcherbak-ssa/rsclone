import React from 'react';

import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-ant-design/plus-outlined';

import { Page } from '../../common/entities';
import { PageListItemComponent, PageListItemComponentProps } from './page-list-item.component';
import { ICON_18_HEIGHT } from '../constants/ui.constants';

export type PageListComponentProps = {
  addPageValue: string,
  color: string,
  pageTitles: string[],
  pageIDs: string[],
  activePage: Page | null,
  setActivePage: Function,
  addPage: Function,
  deletePage: Function,
};

export function PageListComponent({
  addPageValue, color, pageTitles, pageIDs, activePage, setActivePage, addPage, deletePage,
}: PageListComponentProps) {
  if (activePage === null) return <div>Loading...</div>;

  const addPageIconProps = {
    icon: plusIcon,
    height: ICON_18_HEIGHT,
  };

  function drawPageListItems() {
    return pageIDs.map((pageID, index) => {
      const pageListItemProps: PageListItemComponentProps = {
        isLastPage: pageIDs.length === 1,
        color,
        pageID,
        pageTitle: pageTitles[index],
        activePage,
        setActivePage,
        deletePage,
      };

      return <PageListItemComponent key={pageID} {...pageListItemProps}/>
    });
  }

  function handleAddPageClick() {
    addPage();
  }

  return (
    <div className="page-list">
      <div className="page-list-container">
        {drawPageListItems()}
      </div>
      <div className="page-list-item page-add" data-class="click" onClick={handleAddPageClick}>
        {addPageValue}
        <div className="page-list-icon" data-class="flex-center">
          <Icon {...addPageIconProps}/>
        </div>
      </div>
    </div>
  );
}
