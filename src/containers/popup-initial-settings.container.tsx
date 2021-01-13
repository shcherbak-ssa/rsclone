import React from 'react';

import { PopupComponent, PopupComponentProps } from '../components/popup.component';
import { PopupPropsHookParameters, usePopupProps } from '../hooks/popup-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';
import { PopupNames } from '../constants/ui.constants';

export function PopupInitialSettingsContainer() {
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const popupPropsHookParameters: PopupPropsHookParameters = {
    popupName: PopupNames.INITIAL_SETTINGS,
    popupTitle: authLanguage.initialSettingsPopup.title,
    popupConfirmButtonProps: {
      value: authLanguage.initialSettingsPopup.confirmButtonValue,
      clickHandler: () => {},
    },
  };

  const popupProps: PopupComponentProps | null = usePopupProps(popupPropsHookParameters);

  if (popupProps === null) return <div></div>;

  return (
    <PopupComponent {...popupProps}></PopupComponent>
  );
}
