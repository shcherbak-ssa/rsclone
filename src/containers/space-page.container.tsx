import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Space } from '../../common/entities';
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

type SpacePageContainerProps = {
  isSpacePageOpen: boolean,
};

export function SpacePageContainer({isSpacePageOpen}: SpacePageContainerProps) {
  const closeSpacePage = useCloseSpacePage();
  const setActiveSpace = useSetActiveSpace();
  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const activeSpace: Space = useSelector(userStoreSelectors.getActiveSpace());

  useEffect(() => {
    if (!isSpacePageOpen) {
      const storeManager: StoreManager = new StoreManagerService();
      const spacesStore = storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
      const toolsService: ToolsService = new ToolsService();

      const spacePathname: string = toolsService.getSpacePathname();
      const activeSpace: Space = spacesStore.getSpaceByPathname(spacePathname);

      if (activeSpace) {
        setActiveSpace(activeSpace, () => {
          activeSpaceController.emit(ActiveSpaceEvents.SET_IS_OPEN, true);
        });
      } else {
        closeSpacePage();
      }
    }
  }, []);

  const spacePageProps: SpacePageComponentProps = {
    space: activeSpace,
  };

  return (
    <SpacePageComponent {...spacePageProps}></SpacePageComponent>
  );
}
