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

export function CreateSpacePopupContainer() {
  const [isCreatingInProgress, setIsCreatingInProgress] = useState(false);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.CREATE_SPACE,
    confirmButtonProps: {
      isLoading: isCreatingInProgress,
      clickHandler: () => {
        setIsCreatingInProgress(true);

        spacesController.emit(SpacesEvents.CREATE_SPACE, (isCreatedSuccess: boolean) => {
          setIsCreatingInProgress(false);

          if (isCreatedSuccess) {
            const popupService: PopupService = new PopupService();
            popupService.closePopup(PopupNames.CREATE_SPACE);
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

  const createSpacePopupProps: PopupComponentProps = popup[0];

  return (
    <PopupComponent {...createSpacePopupProps}>
      <SpaceSettingsContainer />
    </PopupComponent>
  );
}
