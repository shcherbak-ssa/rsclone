import React from 'react';

import { PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupMessageComponent } from '../../components/popup-message.component';
import { LogoutService } from '../../services/logout.service';

export function LogoutPopupContainer() {
  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.LOGOUT,
    confirmButtonProps: {
      clickHandler: () => {
        new LogoutService().logoutUser();
      },
    },
  };

  const popup: [PopupComponentProps, any] | null = usePopupProps(popupPropsHookParams);

  if (popup === null) return <div></div>;

  const logoutPopupProps: PopupComponentProps = popup[0];
  const logoutPopupMessage: any = popup[1].message;

  return (
    <PopupComponent {...logoutPopupProps}>
      <PopupMessageComponent>{logoutPopupMessage}</PopupMessageComponent>
    </PopupComponent>
  );
}
