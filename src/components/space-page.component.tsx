import React, { useEffect } from 'react';
import './styles/space-page.component.scss';

import { Space } from '../../common/entities';
import { SpaceLogoComponent, SpaceLogoComponentProps } from './space-logo.component';
import { Classnames, SpaceLogoTypes } from '../constants/ui.constants';
import { SpaceColors } from '../../common/constants';
import { DocumentBodyService } from '../services/document-body.service';
import { useCloseSpacePageMenu } from '../hooks/close-space-page-menu.hook';

export type SpacePageComponentProps = {
  space: Space | null,
  closeMenuHandler: Function,
  children?: React.ReactNode,
};

export function SpacePageComponent({space, closeMenuHandler, children}: SpacePageComponentProps) {
  const closeSpacePageMenu = useCloseSpacePageMenu(closeMenuHandler);

  if (space === null) return <div></div>;

  const spaceLogoProps: SpaceLogoComponentProps = {
    logoType: SpaceLogoTypes.PAGE,
    color: space.color as SpaceColors,
    logo: space.logo,
  };

  useEffect(() => {
    return () => {
      closeSpacePageMenu();
    };
  }, []);

  function handleMenuButtonClick() {
    const documentBodyService: DocumentBodyService = new DocumentBodyService();
    documentBodyService.toggleClass(Classnames.IS_SPACE_PAGE_MENU_OPEN);

    if (!documentBodyService.hasClass(Classnames.IS_SPACE_PAGE_MENU_OPEN)) {
      closeMenuHandler();
    }
  }

  return (
    <div className="space-page">
      <div className="space-page-header">
        <div
          className="space-page-menu-button"
          data-class="click flex-center"
          onClick={handleMenuButtonClick}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <SpaceLogoComponent {...spaceLogoProps}/>
        <div className="space-page-title">{space.name}</div>
      </div>
      <div className="space-page-pages">
        {children[0]}
      </div>
      <div className="space-page-editor">
        {children[1]}
        <div className="space-page-tint" onClick={closeSpacePageMenu}></div>
      </div>
      {children[2]}
    </div>
  );
}
