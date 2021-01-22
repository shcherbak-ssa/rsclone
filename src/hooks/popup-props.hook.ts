import { useEffect, useState } from 'react';

import { PopupComponentProps } from '../components/popup.component';
import { PopupNames } from '../constants/ui.constants';
import { PopupService } from '../services/popup.service';
import { usePopupLanguage } from './popup-language.hook';

export type PopupPropsHookParams = {
  popupName: PopupNames,
  confirmButtonProps: any,
  closeHandler?: Function,
};

export function usePopupProps({
  popupName, confirmButtonProps, closeHandler
}: PopupPropsHookParams): [PopupComponentProps, any] | null {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupLanguage = usePopupLanguage(popupName);

  const popupProps: PopupComponentProps = {
    title: popupLanguage.title,
    confirmButtonProps: {
      value: popupLanguage.confirmButtonValue,
      ...confirmButtonProps,
    },
    closePopup,
  };

  useEffect(() => {
    const popupService: PopupService = new PopupService();
    popupService.subscribePopup(popupName, openPopup, () => setIsPopupOpen(false));

    return () => {
      popupService.unsubscribePopup(popupName);
    };
  }, []);

  function openPopup() {
    setIsPopupOpen(true);
  }

  function closePopup() {
    setIsPopupOpen(false);

    if (closeHandler) {
      closeHandler();
    }
  }

  return isPopupOpen ? [popupProps, popupLanguage] : null;
}
