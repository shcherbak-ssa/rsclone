import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './popup.scss';

import { ButtonTypes } from '../../constants';
import { Base, BaseButtonProps } from '../../components/base';
import { DocumentBodyService } from '../../../services/document-body.service';

const POPUP_ELEMENT_ID: string = 'popup';

export type PopupProps = {
  title: string,
  confirmButtonProps: BaseButtonProps,
  closePopup: Function;
  children?: React.ReactNode,
};

export function Popup({
  title, confirmButtonProps, closePopup, children,
}: PopupProps) {
  const popupDomElement = document.getElementById(POPUP_ELEMENT_ID);
  const cancelButtonProps: BaseButtonProps = {
    type: ButtonTypes.SECONDARY,
    value: 'Cancel',
    clickHandler: (e: React.MouseEvent) => {
      e.stopPropagation();
      closePopup();
    },
  };

  const popupContainer = (
    <div className="popup" onClick={popupClickHandle}>
      <div className="popup-container">
        <div className="popup-header">{title}</div>
        <div className="popup-body">{children}</div>
        <div className="popup-footer">
          <Base.Button {...cancelButtonProps} />
          <Base.Button {...confirmButtonProps} />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const documentBodyService = new DocumentBodyService();
    documentBodyService.setOveflowHidden();

    return () => {
      documentBodyService.removeOverflowHidden();
    };
  }, []);

  function popupClickHandle(e: React.MouseEvent) {
    e.stopPropagation();

    if (e.target.classList.contains('popup')) {
      closePopup();
    }
  }

  return ReactDOM.createPortal(popupContainer, popupDomElement);
}
