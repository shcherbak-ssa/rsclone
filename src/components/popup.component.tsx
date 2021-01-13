import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/popup.component.scss';

import { ButtonTypes, DocumentElementIDs } from '../constants/ui.constants';
import { DocumentBodyService } from '../services/document-body.service';
import { BaseButtonProps, Base } from './base';

export type PopupProps = {
  title: string,
  confirmButtonProps: BaseButtonProps,
  closePopup: Function;
  children?: React.ReactNode,
};

export function Popup({
  title, confirmButtonProps, closePopup, children,
}: PopupProps) {
  const popupDomContainer = document.getElementById(DocumentElementIDs.POPUP);

  const cancelButtonProps: BaseButtonProps = {
    type: ButtonTypes.SECONDARY,
    value: 'Cancel',
    clickHandler: (e: React.MouseEvent) => {
      e.stopPropagation();
      closePopup();
    },
  };

  const popup = (
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
    const documentBodyService: DocumentBodyService = new DocumentBodyService();
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

  return ReactDOM.createPortal(popup, popupDomContainer);
}
