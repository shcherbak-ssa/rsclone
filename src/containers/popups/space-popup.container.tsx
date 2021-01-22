import React, { useState } from 'react';
import { Space } from '../../../common/entities';

import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { UserDataLabels } from '../../constants';
import { SpacesEvents } from '../../constants/events.constants';
import { PopupNames } from '../../constants/ui.constants';
import { spacesController, UpdatedSpaceData } from '../../controllers/spaces.controller';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { UpdatesControllerHookParams, useUpdatesController } from '../../hooks/updates-controller.hook';
import { PopupService } from '../../services/popup.service';
import { SpacesService } from '../../services/spaces.service';
import { UpdatedDataService } from '../../services/updated-data.service';
import { SpaceSettingsContainer } from '../space-settings.container';
import { useSetActiveSpace } from '../../hooks/set-active-space.hook';
import { useOpenSpacePage } from '../../hooks/open-space-page.hook';

export type SpacePopupContainerProps = {
  popupName: PopupNames,
  spaceEvent: SpacesEvents,
};

export function SpacePopupContainer({popupName, spaceEvent}: SpacePopupContainerProps) {
  const setActiveSpace = useSetActiveSpace();
  const openSpacePage = useOpenSpacePage();
  const [isInProgress, setIsInProgress] = useState(false);

  const spacesService: SpacesService = new SpacesService();
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
    closeHandler: () => {
      setIsInProgress(false);
      spacesService.resetSpaceStates();
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  function spaceEventCallback(isSuccess: boolean, createdSpace?: Space) {
    setIsInProgress(false);

    if (isSuccess) {
      const popupService: PopupService = new PopupService();
      popupService.closePopup(popupName);

      if (popupName === PopupNames.CREATE_SPACE) {
        setActiveSpace(createdSpace, () => {
          openSpacePage(createdSpace);
        });
      } else {
        spacesService.resetSpaceStates();
      }
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
