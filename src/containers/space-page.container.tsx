import React from 'react';
import { useSelector } from 'react-redux';

import { Space } from '../../common/entities';
import { SpacePageComponent, SpacePageComponentProps } from '../components/space-page.component';
import { Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export function SpacePageContainer() {
  const activeSpaceSelectors = storeSelectorsService.get(Stores.ACTIVE_SPACE_STORE);
  const activeSpace: Space = useSelector(activeSpaceSelectors.getActiveSpace());

  const spacePageProps: SpacePageComponentProps = {
    space: activeSpace,
  };

  return (
    <SpacePageComponent {...spacePageProps}></SpacePageComponent>
  );
}
