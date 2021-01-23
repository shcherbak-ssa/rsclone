import React, { useEffect, useState } from 'react';
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

type SpacePageContainerProps = {
  isSpacePageOpen: boolean,
};

export function SpacePageContainer({isSpacePageOpen}: SpacePageContainerProps) {
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

      console.log(activeSpace);
      setActiveSpace(activeSpace, () => {
        activeSpaceController.emit(ActiveSpaceEvents.SET_IS_OPEN, true);
      });
    }
  }, []);

  const spacePageProps: SpacePageComponentProps = {
    space: activeSpace,
  };

  return (
    <SpacePageComponent {...spacePageProps}></SpacePageComponent>
  );
}
