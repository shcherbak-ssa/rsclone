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

export function SpacePageContainer() {
  const setActiveSpace = useSetActiveSpace();
  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const activeSpace: Space = useSelector(activeSpaceSelectors.getActiveSpace());
  const [space, setSpace] = useState(activeSpace);

  useEffect(() => {
    if (activeSpace === null) {
      const storeManager: StoreManager = new StoreManagerService();
      const spacesStore = storeManager.getStore(Stores.SPACES_STORE) as SpacesStore;
      const toolsService: ToolsService = new ToolsService();

      const spacePathname: string = toolsService.getSpacePathname();
      const activeSpace: Space = spacesStore.getSpaceByPathname(spacePathname);
      
      setSpace(activeSpace);
      setActiveSpace(activeSpace, () => {
        activeSpaceController.emit(ActiveSpaceEvents.SET_ACTIVE_SPACE, activeSpace);
      });
    }
  }, []);

  const spacePageProps: SpacePageComponentProps = {
    space,
  };

  return (
    <SpacePageComponent {...spacePageProps}></SpacePageComponent>
  );
}
