import React, { useEffect, useState } from 'react';
import './popup.scss';

import { AppEvents, ButtonTypes } from '../../constants';
import { Base, BaseButtonProps } from '../../components/base';
import { popupController } from '../../controllers/popup.controller';

export type PopupProps = {
  title: string,
  body: React.ReactNode,
  confirmButtonProps: BaseButtonProps,
};

export function Popup() {
  const [popupProps, setPopupProps] = useState(null);

  const cancelButtonProps: BaseButtonProps = {
    type: ButtonTypes.SECONDARY,
    value: 'Cancel',
    clickHandler: (e: React.MouseEvent) => {},
  };

  useEffect(() => {
    popupController.on(AppEvents.SHOW_POPUP, (currentPopupProps: PopupProps) => {
      setPopupProps(currentPopupProps);
    });
  }, []);

  function closePopup(e: React.MouseEvent) {
    e.stopPropagation();

    const {classList: targetClassList} = e.target;

    if (
      targetClassList.contains('popup') ||
      targetClassList.contains('button')
    ) {
      setPopupProps(null);
    }
  }

  if (popupProps === null) return <div></div>;

  return (
    <div className="popup" onClick={closePopup}>
      <div className="popup-container">
        <div className="popup-header">{popupProps.title}</div>
        <div className="popup-body">{popupProps.body}</div>
        <div className="popup-footer">
          <Base.Button {...cancelButtonProps} />
          <Base.Button {...popupProps.confirmButtonProps} />
        </div>
      </div>
    </div>
  );
}
