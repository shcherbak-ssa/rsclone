import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/popup.component.scss';

import { ButtonTypes, DocumentElementIDs } from '../constants/ui.constants';
import { DocumentBodyService } from '../services/document-body.service';
import { BaseButtonProps, Base } from './base';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';

export type PopupComponentProps = {
  title: string,
  confirmButtonProps: BaseButtonProps,
  closePopup: Function;
  children?: React.ReactNode,
};

export function PopupComponent({
  title, confirmButtonProps, closePopup, children,
}: PopupComponentProps) {
  const popupDomContainer = document.getElementById(DocumentElementIDs.POPUP);
  const assetsLanguage = useLanguagePart(LanguageParts.ASSETS);

  const cancelButtonProps: BaseButtonProps = {
    type: ButtonTypes.SECONDARY,
    value: assetsLanguage.popupCloseButtonValue,
    clickHandler: closePopup,
  };

  const popup = (
    <div className="popup" onClick={popupClickHandle}>
      <div className="popup-container">
        <div className="popup-header">{title}</div>
        <div className="popup-scroll">
          <div className="popup-body">{children}</div>
          <div className="popup-footer">
            <Base.Button {...cancelButtonProps} />
            <Base.Button {...confirmButtonProps} />
          </div>
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
