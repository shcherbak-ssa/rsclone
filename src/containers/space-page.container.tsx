import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Page, Space } from '../../common/entities';
import { SpacePageComponent, SpacePageComponentProps } from '../components/space-page.component';
import { AppRoutePathnames, Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { StoreManager } from '../types/store.types';
import { StoreManagerService } from '../services/store-manager.service';
import { SpacesStore } from '../types/spaces.types';
import { activeSpaceController, NewPage, OpenSpace, SetActivePage } from '../controllers/active-space.controller';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ToolsService } from '../services/tools.service';
import { useSetActiveSpace } from '../hooks/set-active-space.hook';
import { useCloseSpacePage } from '../hooks/close-space-page.hook';
import { PageContainer, PageContainerProps } from './page.container';
import { PageListComponentProps, PageListComponent } from '../components/page-list.component';
import { ShortcutsLabels } from '../../common/constants';
import { useHotkeys } from 'react-hotkeys-hook';
import { useAppLanguage } from '../hooks/app-language.hook';
import { DeletePopupContainer, DeletePopupContainerProps } from './popups/delete-popup.container';
import { PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { AppRoutes } from '../types/services.types';
import { AppRoutesService } from '../services/app-routes.service';
import { ActiveSpaceStore } from '../types/active-space.types';
import { EMPTY_STRING } from '../constants/strings.constants';
import { useCloseSpacePageMenu } from '../hooks/close-space-page-menu.hook';
import { LoaderComponent } from '../components/loader.component';

export type SpacePageContainerProps = {
  isSpacePageOpen: boolean,
  closeMenuHandler: Function,
};

export function SpacePageContainer({isSpacePageOpen, closeMenuHandler}: SpacePageContainerProps) {
  const history = useHistory();
  const pageLanguage = useAppLanguage().page;

  const [deletePagePopupProps, setDeletePagePopupProps] = useState(null);

  const closeSpacePage = useCloseSpacePage();
  const setActiveSpace = useSetActiveSpace();
  const closeSpacePageMenu = useCloseSpacePageMenu(closeMenuHandler);

  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const activeSpace: Space = useSelector(userStoreSelectors.getActiveSpace());
  const addPageShortcutKeys = useSelector(userStoreSelectors.getShortcutKeys(ShortcutsLabels.ADD_PAGE));

  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const activePage: Page = useSelector(activeSpaceSelectors.getActivePage());
  const pageTitles: string[] = useSelector(activeSpaceSelectors.getPageTitles());

  useEffect(() => {
    if (!isSpacePageOpen) {
      const storeManager: StoreManager = new StoreManagerService();
      const spacesStore = storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
      const toolsService: ToolsService = new ToolsService();

      const {spacePathname, pagePathname} = toolsService.getOpenSpacePathnames();
      const activeSpace: Space = spacesStore.getSpaceByPathname(spacePathname);

      if (activeSpace) {
        setActiveSpace(activeSpace, () => {
          const openSpace: OpenSpace = {
            spacePathname,
            pagePathname,
          };

          activeSpaceController.emit(ActiveSpaceEvents.OPEN_SPACE, openSpace);
        });
      } else {
        closeSpacePage();
      }
    }
  }, []);

  useEffect(() => {
    const deletePopupProps: DeletePopupContainerProps = {
      popupName: PopupNames.DELETE_PAGE,
      controller: activeSpaceController,
      controllerEvent: ActiveSpaceEvents.DELETE_PAGE,
    };

    setDeletePagePopupProps(deletePopupProps);
  }, []);

  useEffect(() => {
    if (activePage) {
      changePagePathname(activePage.id);
    }
  }, [activePage && activePage.title]);

  useHotkeys(addPageShortcutKeys, () => addPage());

  const spacePageProps: SpacePageComponentProps = {
    space: activeSpace,
    closeMenuHandler,
  };

  const pageListProps: PageListComponentProps = {
    addPageValue: pageLanguage.addPage,
    color: activeSpace.color,
    pageTitles,
    pageIDs: activeSpace.pages,
    activePage,
    setActivePage,
    addPage,
    deletePage,
  };

  const pageProps: PageContainerProps = {
    activeSpace,
    activePage,
    pageLanguage,
    pageTitles,
    setActivePage,
  };

  const newPage: NewPage = {
    newPageTitle: pageLanguage.newPageTitle,
    callback: changePagePathname,
  };

  function setActivePage(pageID: string) {
    const setActivePagePayload: SetActivePage = {
      pageID,
      callback: () => {
        changePagePathname(pageID);
      },
    };

    activeSpaceController.emit(ActiveSpaceEvents.SET_ACTIVE_PAGE, setActivePagePayload);

    closeSpacePageMenu();
  }

  function addPage() {
    activeSpaceController.emit(ActiveSpaceEvents.ADD_PAGE, newPage);
  }

  function changePagePathname(pageID: string) {
    const storeManager: StoreManager = new StoreManagerService();
    const appRoutes: AppRoutes = new AppRoutesService();

    const activeSpaceStore = storeManager.getStore(Stores.ACTIVE_SPACE_STORE) as ActiveSpaceStore;
    const pages: Page[] = activeSpaceStore.getPages();

    let pagePathname: string = EMPTY_STRING;

    if (pages[0].id !== pageID) {
      pagePathname = pages.find((page) => page.id === pageID).pathname;
    }

    const activePageRoutePath: string
      = appRoutes.getActivePageRoutePath(activeSpace.pathname, pagePathname);

    history.push(activePageRoutePath);
  }

  function deletePage(pageID: string) {
    const deletePagePopupControllerPayload = {
      pageID,
      activePage,
      changePagePathname,
    };

    setDeletePagePopupProps({
      ...deletePagePopupProps,
      controllerPayload: deletePagePopupControllerPayload,
    });

    const popupService: PopupService = new PopupService();
    popupService.openPopup(PopupNames.DELETE_PAGE);
  }

  function drawPage() {
    if (!activePage) return <LoaderComponent />;

    return (
      <Switch>
        <Route path={AppRoutePathnames.SPACE_PAGE} exact>
          <PageContainer {...pageProps}/>
        </Route>
        <Route path={AppRoutePathnames.ACTIVE_PAGE}>
          <PageContainer {...pageProps}/>
        </Route>
      </Switch>
    );
  }

  function drawDeletePagePopup() {
    if (deletePagePopupProps === null) return <div></div>;

    return <DeletePopupContainer {...deletePagePopupProps}/>;
  }

  return (
    <SpacePageComponent {...spacePageProps}>
      <PageListComponent {...pageListProps}/>
      {drawPage()}
      {drawDeletePagePopup()}
    </SpacePageComponent>
  );
}
