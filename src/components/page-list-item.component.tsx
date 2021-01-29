import React from 'react';
import classnames from 'classnames';

import { Classnames } from '../constants/ui.constants';
import { Page } from '../../common/entities';
import { AssetsService } from '../services/assets.service';

export type PageListItemComponentProps = {
  color: string,
  pageTitle: string,
  pageID: string,
  activePage: Page,
  setActivePage: Function,
};

export function PageListItemComponent({
  color, pageTitle, pageID, activePage, setActivePage,
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
      <div className="page-list-title">{getPageListTitle()}</div>
    </div>
  );
}
