import React, { useState } from 'react';

import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { UserDataLabels } from '../../constants';
import { SpacesEvents, UserDraftEvents } from '../../constants/events.constants';
import { PopupNames } from '../../constants/ui.constants';
import { spacesController } from '../../controllers/spaces.controller';
import { userDraftController } from '../../controllers/user-draft.controller';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupService } from '../../services/popup.service';
import { SpaceSettingsContainer } from '../space-settings.container';

export type SpacePopupContainerProps = {
  popupName: PopupNames,
  spaceEvent: SpacesEvents,
};

export function SpacePopupContainer({popupName, spaceEvent}: SpacePopupContainerProps) {
  const [isInProgress, setIsInProgress] = useState(false);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName,
    confirmButtonProps: {
      isLoading: isInProgress,
      clickHandler: () => {
        setIsInProgress(true);

        spacesController.emit(spaceEvent, (isSuccess: boolean) => {
          setIsInProgress(false);

          if (isSuccess) {
            const popupService: PopupService = new PopupService();
            popupService.closePopup(popupName);
          }
        });
      },
    },
    closeHanlder: () => {
      const resetSpaceDataLabels: UserDataLabels[] = [
        UserDataLabels.SPACE_COLOR,
        UserDataLabels.SPACE_NAME,
      ];

      userDraftController.emit(UserDraftEvents.RESET_STATES, resetSpaceDataLabels);
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  if (popup === null) return <div></div>;

  const spacePopupProps: PopupComponentProps = popup[0];

  return (
    <PopupComponent {...spacePopupProps}>
      <SpaceSettingsContainer />
    </PopupComponent>
  );
}
