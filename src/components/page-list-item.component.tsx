import React from 'react';
import classnames from 'classnames';

import { Icon } from '@iconify/react';
import deleteIcon from '@iconify/icons-ic/baseline-delete-forever';

import { Classnames } from '../constants/ui.constants';
import { Page } from '../../common/entities';
import { AssetsService } from '../services/assets.service';
import { NEW_PAGE_ID } from '../constants';
import { ICON_18_HEIGHT } from '../constants/ui.constants';

const LOADER_ITEMS_COUNT: number = 4;

export type PageListItemComponentProps = {
  color: string,
  pageTitle: string,
  pageID: string,
  activePage: Page,
  setActivePage: Function,
  deletePage: Function,
};

export function PageListItemComponent({
  color, pageTitle, pageID, activePage, setActivePage, deletePage
}: PageListItemComponentProps) {
  const isActivePage = pageID === activePage.id;

  const componentClassnames = classnames('page-list-item', {
    [Classnames.IS_ACTIVE]: isActivePage,
  });

  function setActivePageStyles() {
    return isActivePage ? AssetsService.createHexColorStyle(color) : {}
  }

  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();

    if (!isActivePage) {
      setActivePage(pageID);
    }
  }

  function handleDeletePageIconClick(e: React.MouseEvent) {
    e.stopPropagation();
    deletePage(pageID);
  }

  function drawListItemContent() {
    if (pageID === NEW_PAGE_ID) {
      return <div className="lds-ellipsis">{drawLoaderItems()}</div>;
    }

    const deletePageIconProps = {
      icon: deleteIcon,
      height: ICON_18_HEIGHT,
    };

    return (
      <>
        <div className="page-list-title">{getPageListTitle()}</div>
        <div
          className="page-list-icon"
          data-class="click flex-center"
          onClick={handleDeletePageIconClick}
        >
          <Icon {...deletePageIconProps}/>
        </div>
      </>
    );
  }

  function drawLoaderItems() {
    return new Array(LOADER_ITEMS_COUNT).fill(0).map((it, index) => {
      return <div style={AssetsService.createHexBackgroundColorStyle(color)} key={index}></div>
    });
  }

  function getPageListTitle() {
    return isActivePage ? activePage.title : pageTitle;
  }

  return (
    <div
      className={componentClassnames}
      data-class="click"
      style={setActivePageStyles()}
      onClick={handleClick}
    >
      {drawListItemContent()}
    </div>
  );
}
