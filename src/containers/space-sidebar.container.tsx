import React from 'react';
import { useHistory } from 'react-router-dom';
import { ActionIconComponent, ActionIconComponentProps } from '../components/action-icon.component';

import { AvatarComponent, AvatarComponentProps } from '../components/avatar.component';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActionIconLabels } from '../constants/ui.constants';
import { activeSpaceController } from '../controllers/active-space.controller';
import { ActionIconPropsHookParams, useActionIconProps } from '../hooks/action-icon-props.hook';
import { useAvatarUserData } from '../hooks/avatar-user-data.hook';
import { AppRoutesService } from '../services/app-routes.service';
import { SpacesService } from '../services/spaces.service';
import { AppRoutes } from '../types/services.types';
import { useAppLanguage } from '../hooks/app-language.hook';

export type SpaceSidebarContainerProps = {
  activeSpaceSidebarActionIcon: string,
  setActiveSpaceSidebarActionIcon: Function,
};

export function SpaceSidebarContainer({
  activeSpaceSidebarActionIcon, setActiveSpaceSidebarActionIcon,
}: SpaceSidebarContainerProps) {
  const history = useHistory();
  const appLanguage = useAppLanguage();
  const {userAvatar, userFullname} = useAvatarUserData();

  const avatarProps: AvatarComponentProps = {
    avatarUrl: userAvatar,
    userFullname,
    clickHandler: () => {
      activeSpaceController.emit(ActiveSpaceEvents.SET_IS_OPEN, false);

      const appRoutes: AppRoutes = new AppRoutesService();
      const rootRoutePath: string = appRoutes.getRootRoutePath();
      history.push(rootRoutePath);

      const spacesService: SpacesService = new SpacesService();
      spacesService.resetSpaceStates();
    },
  };

  const actionIconPropsParams: ActionIconPropsHookParams = {
    icons: [
      ActionIconLabels.SETTINGS,
    ],
    iconPayloads: {
      [ActionIconLabels.SETTINGS]: {
        description: appLanguage.actionIconDescriptions[ActionIconLabels.SETTINGS],
        clickHandler: () => {
          setNextActiveSpaceSidebarActionIcon(ActionIconLabels.SETTINGS);
        },
      },
    },
    activeActionIconLabel: activeSpaceSidebarActionIcon,
  };

  const actionIconsProps: ActionIconComponentProps[] = useActionIconProps(actionIconPropsParams);

  function setNextActiveSpaceSidebarActionIcon(actionIconLabel: ActionIconLabels): void {
    const nextActiveSpaceSidebarActionIcon
      = actionIconLabel === activeSpaceSidebarActionIcon ? '' : actionIconLabel;

    setActiveSpaceSidebarActionIcon(nextActiveSpaceSidebarActionIcon);
  }

  function drawActionIcons() {
    return actionIconsProps.map((actionIconProps, index) => {
      return <ActionIconComponent key={index} {...actionIconProps} />
    });
  }
  
  return (
    <>
      <AvatarComponent {...avatarProps}/>
      {drawActionIcons()}
    </>
  );
}
