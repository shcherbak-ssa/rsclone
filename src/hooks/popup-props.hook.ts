import { useState } from 'react';

import { BaseButtonProps } from '../components/base';
import { PopupComponentProps } from '../components/popup.component';

export type PopupPropsHookParameters = {
  popupTitle: string;
  popupConfirmButtonProps: BaseButtonProps;
};

export function usePopupProps(
  {popupTitle, popupConfirmButtonProps}: PopupPropsHookParameters
): PopupComponentProps | null {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupProps: PopupComponentProps = {
    title: popupTitle,
    confirmButtonProps: popupConfirmButtonProps,
    closePopup: () => {
      setIsPopupOpen(false);
    },
  };

  return isPopupOpen ? popupProps : null;
}
