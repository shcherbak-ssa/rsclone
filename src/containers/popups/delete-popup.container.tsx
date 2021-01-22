import React, { useState } from 'react';

import { ButtonTypes, PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupMessageComponent } from '../../components/popup-message.component';
import { Base, BaseInputProps } from '../../components/base';
import { EMPTY_STRING } from '../../constants/strings.constants';
import { Controller } from '../../types/services.types';
import { PopupService } from '../../services/popup.service';
import { SpacesService } from '../../services/spaces.service';

export type DeletePopupContainerProps = {
  popupName: PopupNames,
  controller: Controller,
  controllerEvent: string,
};

export function DeletePopupContainer({
  popupName, controller, controllerEvent,
}: DeletePopupContainerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [confirmDeletionValue, setConfirmDeletionValue] = useState(EMPTY_STRING);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName,
    confirmButtonProps: {
      isLoading,
      isDisable: !isConfirmed,
      type: ButtonTypes.DANGER,
      clickHandler: () => {
        setIsLoading(true);

        controller.emit(controllerEvent, (deleted: boolean) => {
          resetStates();

          if (deleted) {
            const popupService: PopupService = new PopupService();
            popupService.closePopup(popupName);

            resetSpaceStates();
          }
        });
      },
    },
    closeHandler: () => {
      resetStates();
      resetSpaceStates();
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  function resetStates() {
    setIsLoading(false);
    setIsConfirmed(false);
    setConfirmDeletionValue(EMPTY_STRING);
  }

  function resetSpaceStates() {
    if (popupName === PopupNames.DELETE_SPACE) {
      const spacesService: SpacesService = new SpacesService();
      spacesService.resetSpaceStates();
    }
  }

  if (popup === null) return <div></div>;

  const deletePopupProps: PopupComponentProps = popup[0];
  const deletePopupLanguage: any = popup[1];

  const confirmDeletionInputProps: BaseInputProps = {
    value: confirmDeletionValue,
    error: EMPTY_STRING,
    placeholder: deletePopupLanguage.placeholder,
    description: deletePopupLanguage.description,
    updateValue: (value: string) => {
      setConfirmDeletionValue(value);
      setIsConfirmed(value === deletePopupLanguage.confirmWord);
    },
  };

  return (
    <PopupComponent {...deletePopupProps}>
      <PopupMessageComponent>{deletePopupLanguage.message}</PopupMessageComponent>
      <Base.Input {...confirmDeletionInputProps}/>
    </PopupComponent>
  );
}
