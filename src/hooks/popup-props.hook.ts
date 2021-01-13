import { useState } from 'react';

import { BaseButtonProps } from '../components/base';
import { PopupComponentProps } from '../components/popup.component';

export type PopupPropsParameters = {
  popupTitle: string;
  popupConfirmButtonProps: BaseButtonProps;
};

export type OpenPopupProps = {
  openPopup: () => void;
};

export function usePopupProps(
  {popupTitle, popupConfirmButtonProps}: PopupPropsParameters
): PopupComponentProps | OpenPopupProps {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const popupProps: PopupComponentProps = {
    title: popupTitle,
    confirmButtonProps: popupConfirmButtonProps,
    closePopup: () => {
      setIsPopupOpen(false);
    },
  };

  const openPopupProps: OpenPopupProps = {
    openPopup: () => {
      setIsPopupOpen(true);
    },
  };

  return isPopupOpen ? popupProps : openPopupProps;
}
