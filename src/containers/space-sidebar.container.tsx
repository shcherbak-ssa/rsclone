import React from 'react';
import { useHistory } from 'react-router-dom';

import { AvatarComponent, AvatarComponentProps } from '../components/avatar.component';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { activeSpaceController } from '../controllers/active-space.controller';
import { useAvatarUserData } from '../hooks/avatar-user-data.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesService } from '../services/spaces.service';
import { AppRoutes } from '../types/services.types';

export function SpaceSidebarContainer() {
  const history = useHistory();
  const {userAvatar, userFullname} = useAvatarUserData();

  const avatarProps: AvatarComponentProps = {
    avatarUrl: userAvatar,
    userFullname,
    clickHandler: () => {
      activeSpaceController.emit(ActiveSpaceEvents.REMOVE_ACTIVE_SPACE);

      const appRoutes: AppRoutes = new AppRoutesService();
      const rootRoutePath: string = appRoutes.getRootRoutePath();
      history.push(rootRoutePath);

      const spacesService: SpacesService = new SpacesService();
      spacesService.resetSpaceStates();
    },
  };
  
  return (
    <>
      <AvatarComponent {...avatarProps}/>
    </>
  );
}
