import React, { useState } from 'react';

import { ButtonTypes, PopupNames } from '../../constants/ui.constants';
import { PopupPropsHookParams, usePopupProps } from '../../hooks/popup-props.hook';
import { PopupComponent, PopupComponentProps } from '../../components/popup.component';
import { PopupTextComponent } from '../../components/popup-text.component';
import { userController } from '../../controllers/user.controller';
import { UserEvents } from '../../constants/events.constants';

export function DeleteAccountPopupContainer() {
  const [isLoading, setIsLoading] = useState(false);

  const popupPropsHookParams: PopupPropsHookParams = {
    popupName: PopupNames.DELETE_ACCOUNT,
    confirmButtonProps: {
      isLoading,
      type: ButtonTypes.DANGER,
      clickHandler: () => {
        setIsLoading(true);

        userController.emit(UserEvents.DELETE_USER, (deleted: boolean) => {
          if (deleted) {
            setIsLoading(false);
          }
        });
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
