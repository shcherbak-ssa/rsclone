import React from 'react';

import { ActionIconComponent, ActionIconComponentProps } from '../components/action-icon.component';
import { AvatarComponent, AvatarComponentProps } from '../components/avatar.component';
import { ActionIconLabels } from '../constants/ui.constants';
import { ActionIconPropsHookParams, useActionIconProps } from '../hooks/action-icon-props.hook';
import { useAvatarUserData } from '../hooks/avatar-user-data.hook';
import { useAppLanguage } from '../hooks/app-language.hook';
import { useCloseSpacePage } from '../hooks/close-space-page.hook';

export type SpaceSidebarContainerProps = {
  activeSpaceSidebarActionIcon: string,
  setActiveSpaceSidebarActionIcon: Function,
};

export function SpaceSidebarContainer({
  activeSpaceSidebarActionIcon, setActiveSpaceSidebarActionIcon,
}: SpaceSidebarContainerProps) {
  const appLanguage = useAppLanguage();
  const closeSpacePage = useCloseSpacePage();
  const {userAvatar, userFullname} = useAvatarUserData();

  const avatarProps: AvatarComponentProps = {
    avatarUrl: userAvatar,
    userFullname,
    clickHandler: () => {
      closeSpacePage();
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
