import React, { useState } from 'react';

import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { SpaceSettingsContainer } from '../space-settings.container';

export function CreateSpacePopupContainer() {
  const [isCreatingInProgress, setIsCreatingInProgress] = useState(false);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.CREATE_SPACE,
    confirmButtonProps: {
      isLoading: isCreatingInProgress,
      clickHandler: () => {},
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
