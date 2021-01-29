import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Page, Space } from '../../common/entities';
import { SpacePageComponent, SpacePageComponentProps } from '../components/space-page.component';
import { Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { SpacesStore } from '../types/spaces.types';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ToolsService } from '../services/tools.service';
import { useSetActiveSpace } from '../hooks/set-active-space.hook';
import { useCloseSpacePage } from '../hooks/close-space-page.hook';
import { PageContainer } from './page.container';
import { PageListComponentProps, PageListComponent } from '../components/page-list.component';
import { ShortcutsLabels } from '../../common/constants';
import { useHotkeys } from 'react-hotkeys-hook';

export type SpacePageContainerProps = {
  isSpacePageOpen: boolean,
  closeMenuHandler: Function,
};

export function SpacePageContainer({isSpacePageOpen, closeMenuHandler}: SpacePageContainerProps) {
  const closeSpacePage = useCloseSpacePage();
  const setActiveSpace = useSetActiveSpace();

  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const activeSpace: Space = useSelector(userStoreSelectors.getActiveSpace());
  const addPageShortcutKeys = useSelector(userStoreSelectors.getShortcutKeys(ShortcutsLabels.ADD_PAGE));

  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const activePage: Page = useSelector(activeSpaceSelectors.getActivePage());
  const pageTitles: string[] = useSelector(activeSpaceSelectors.getPageTitles());

  useHotkeys(addPageShortcutKeys, addPage);

  useEffect(() => {
    if (!isSpacePageOpen) {
      const storeManager: StoreManager = new StoreManagerService();
      const spacesStore = storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
      const toolsService: ToolsService = new ToolsService();

      const {spacePathname, pagePathname} = toolsService.getOpenSpacePathnames();
      const activeSpace: Space = spacesStore.getSpaceByPathname(spacePathname);

      if (activeSpace) {
        setActiveSpace(activeSpace, () => {
          activeSpaceController.emit(ActiveSpaceEvents.OPEN_SPACE, activeSpace.pathname);
        });
      } else {
        closeSpacePage();
      }
    }
  }, []);

  const spacePageProps: SpacePageComponentProps = {
    space: activeSpace,
    closeMenuHandler,
  };

  const pageListProps: PageListComponentProps = {
    color: activeSpace.color,
    pageTitles,
    pageIDs: activeSpace.pages,
    activePage,
    setActivePage,
    addPage,
  };

  function setActivePage(pageID: string) {
    activeSpaceController.emit(ActiveSpaceEvents.SET_ACTIVE_PAGE, pageID);
  }

  function addPage() {
    console.log('add page');
  }

  return (
    <SpacePageComponent {...spacePageProps}>
      <PageListComponent {...pageListProps}/>
      <PageContainer />
    </SpacePageComponent>
  );
}
