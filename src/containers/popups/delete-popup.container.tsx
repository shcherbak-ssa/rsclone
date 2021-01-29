import React, { useState } from 'react';

import { ButtonTypes, PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupMessageComponent } from '../../components/popup-message.component';
import { Base, BaseInputProps } from '../../components/base';
import { EMPTY_STRING } from '../../constants/strings.constants';
import { Controller } from '../../types/services.types';
import { PopupService } from '../../services/popup.service';
import { useCloseSpacePage } from '../../hooks/close-space-page.hook';
import { useAppLanguage } from '../../hooks/app-language.hook';

export type DeletePopupContainerProps = {
  popupName: PopupNames,
  controller: Controller,
  controllerEvent: string,
  controllerPayload?: any,
};

export function DeletePopupContainer({
  popupName, controller, controllerEvent, controllerPayload,
}: DeletePopupContainerProps) {
  const appLanguage = useAppLanguage();
  const closeSpacePage = useCloseSpacePage();

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

        if (controllerPayload) {
          controller.emit(controllerEvent, {
            ...controllerPayload,
            callback: controllerCallback,
          });
        } else {
          controller.emit(controllerEvent, controllerCallback);
        }
      },
    },
    closeHandler: () => {
      resetStates();
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  function resetStates() {
    setIsLoading(false);
    setIsConfirmed(false);
    setConfirmDeletionValue(EMPTY_STRING);
  }

  function controllerCallback(deleted: boolean): void {
    resetStates();

    if (deleted) {
      const popupService: PopupService = new PopupService();
      popupService.closePopup(popupName);

      closeSpacePage();
    }
  }

  if (popup === null) return <div></div>;

  const deletePopupProps: PopupComponentProps = popup[0];
  const deletePopupLanguage: any = popup[1];
  const {deletePopupConfirmation} = appLanguage;

  const confirmDeletionInputProps: BaseInputProps = {
    value: confirmDeletionValue,
    error: EMPTY_STRING,
    placeholder: deletePopupConfirmation.placeholder,
    description: deletePopupConfirmation.description,
    updateValue: (value: string) => {
      setConfirmDeletionValue(value);
      setIsConfirmed(value === deletePopupConfirmation.confirmWord);
    },
  };

  return (
    <PopupComponent {...deletePopupProps}>
      <PopupMessageComponent>{deletePopupLanguage.message}</PopupMessageComponent>
      <Base.Input {...confirmDeletionInputProps}/>
    </PopupComponent>
  );
}
