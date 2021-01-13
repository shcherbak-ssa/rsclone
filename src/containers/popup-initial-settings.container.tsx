import React from 'react';
import { useSelector } from 'react-redux';

import { PopupComponent, PopupComponentProps } from '../components/popup.component';
import { PopupPropsHookParameters, usePopupProps } from '../hooks/popup-props.hook';
import { useLanguagePart } from '../hooks/language-part.hook';
import { LanguageParts } from '../../common/constants';
import { PopupNames } from '../constants/ui.constants';
import { SelectLanguageContainer, SelectLanguageContainerProps } from './select-language.container';
import { storeSelectorsService } from '../services/store-selectors.service';
import { Stores } from '../constants';

export function PopupInitialSettingsContainer() {
  const authLanguage = useLanguagePart(LanguageParts.AUTH);

  const authStoreSelectors = storeSelectorsService.get(Stores.AUTH_STORE);
  const currentLanguageState = useSelector(authStoreSelectors.getLanguageState());

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

  const selectLanguageContainerProps: SelectLanguageContainerProps = {
    initialItemLabel: currentLanguageState,
  };

  return (
    <PopupComponent {...popupProps}>
      <SelectLanguageContainer {...selectLanguageContainerProps} />
    </PopupComponent>
  );
}
