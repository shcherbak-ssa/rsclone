import { useEffect, useState } from 'react';

import { BaseButtonProps } from '../components/base';
import { PopupComponentProps } from '../components/popup.component';
import { PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';

export type PopupPropsHookParameters = {
  popupName: PopupNames;
  popupTitle: string;
  popupConfirmButtonProps: BaseButtonProps;
};

export function usePopupProps(
  {popupName, popupTitle, popupConfirmButtonProps}: PopupPropsHookParameters
): PopupComponentProps | null {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupProps: PopupComponentProps = {
    title: popupTitle,
    confirmButtonProps: popupConfirmButtonProps,
    closePopup,
  };

  useEffect(() => {
    const popupService: PopupService = new PopupService();
    popupService.subscribePopup(popupName, openPopup, closePopup);

    return () => {
      popupService.unsubscribePopup(popupName);
    };
  }, []);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);
  }

  return isPopupOpen ? popupProps : null;
}
