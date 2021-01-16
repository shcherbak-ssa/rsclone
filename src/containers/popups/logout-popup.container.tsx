import React from 'react';

import { PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupTextComponent } from '../../components/popup-text.component';
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

  return (
    <PopupComponent {...popup[0]}>
      <PopupTextComponent>{popup[1].content}</PopupTextComponent>
    </PopupComponent>
  );
}
