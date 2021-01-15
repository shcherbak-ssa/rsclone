import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { DocumentBodyService } from '../services/document-body.service';

export function useChangeTheme() {
  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const currentTheme = useSelector(userStoreSelectors.getState(UserDataLabels.THEME));

  useEffect(() => {
    const documentBodyService = new DocumentBodyService();
    documentBodyService.addClass(currentTheme);

    return () => {
      documentBodyService.removeClass(currentTheme);
    };
  }, [currentTheme]);
}
