import React, { useState } from 'react';

import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { UserDataLabels } from '../../constants';
import { SpacesEvents, UserDraftEvents, UserEvents } from '../../constants/events.constants';
import { PopupNames } from '../../constants/ui.constants';
import { spacesController, UpdatedSpaceData } from '../../controllers/spaces.controller';
import { userDraftController } from '../../controllers/user-draft.controller';
import { ActiveSpace, userController } from '../../controllers/user.controller';
import { resetActiveSpaceData, spacesDataLabels } from '../../data/spaces.data';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { UpdatesControllerHookParams, useUpdatesController } from '../../hooks/updates-controller.hook';
import { PopupService } from '../../services/popup.service';
import { UpdatedDataService } from '../../services/updated-data.service';
import { SpaceSettingsContainer } from '../space-settings.container';

export type SpacePopupContainerProps = {
  popupName: PopupNames,
  spaceEvent: SpacesEvents,
};

export function SpacePopupContainer({popupName, spaceEvent}: SpacePopupContainerProps) {
  const [isInProgress, setIsInProgress] = useState(false);

  const controlDataLabels: UserDataLabels[] = [UserDataLabels.SPACE_NAME];

  if (popupName === PopupNames.UPDATE_SPACE) {
    controlDataLabels.push(
      UserDataLabels.SPACE_LOGO,
      UserDataLabels.SPACE_COLOR,
    );
  }

  const updatedData: UpdatedDataService = new UpdatedDataService();
  const updatesControllerHookParams: UpdatesControllerHookParams = {
    controlDataLabels,
    updatedData,
  };

  const isUpdatesExist: boolean = useUpdatesController(updatesControllerHookParams);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName,
    confirmButtonProps: {
      isLoading: isInProgress,
      isDisable: !isUpdatesExist,
      clickHandler: () => {
        setIsInProgress(true);

        if (popupName === PopupNames.UPDATE_SPACE) {
          const updatedSpace: UpdatedSpaceData = {
            updatedData: updatedData.get(),
            callback: spaceEventCallback,
          };

          spacesController.emit(spaceEvent, updatedSpace);
        } else {
          spacesController.emit(spaceEvent, spaceEventCallback);
        }
      },
    },
    closeHanlder: () => {
      const activeSpace: ActiveSpace = {
        space: resetActiveSpaceData,
        callback: () => {},
      };

      userController.emit(UserEvents.SET_ACTIVE_SPACE, activeSpace);
      userDraftController.emit(UserDraftEvents.RESET_STATES, spacesDataLabels);
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  function spaceEventCallback(isSuccess: boolean) {
    setIsInProgress(false);

    if (isSuccess) {
      const popupService: PopupService = new PopupService();
      popupService.closePopup(popupName);
    }
  }

  if (popup === null) return <div></div>;

  const spacePopupProps: PopupComponentProps = popup[0];

  return (
    <PopupComponent {...spacePopupProps}>
      <SpaceSettingsContainer />
    </PopupComponent>
  );
}
