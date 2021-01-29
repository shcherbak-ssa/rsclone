import React from 'react';

import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-ant-design/plus-outlined';

import { Page } from '../../common/entities';
import { PageListItemComponent, PageListItemComponentProps } from './page-list-item.component';
import { useAppLanguage } from '../hooks/app-language.hook';
import { ICON_18_HEIGHT } from '../constants/ui.constants';

export type PageListComponentProps = {
  color: string,
  pageTitles: string[],
  pageIDs: string[],
  activePage: Page | null,
  setActivePage: Function,
  addPage: Function,
};

export function PageListComponent({
  color, pageTitles, pageIDs, activePage, setActivePage, addPage,
}: PageListComponentProps) {
  const appLanguage = useAppLanguage();

  if (activePage === null) return <div>Loading...</div>;

  const addPageIconProps = {
    icon: plusIcon,
    height: ICON_18_HEIGHT,
  };

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

  function handleAddPageClick() {
    addPage();
  }

  return (
    <div className="page-list">
      {drawPageListItems()}
      <div className="page-list-item page-add" data-class="click" onClick={handleAddPageClick}>
        {appLanguage.page.addPage}
        <div className="page-list-icon" data-class="flex-center">
          <Icon {...addPageIconProps}/>
        </div>
      </div>
    </div>
  );
}
