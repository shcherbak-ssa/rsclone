import { useSelector } from 'react-redux';

import { LanguageParts } from '../../common/constants';
import { Stores } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export function useLanguagePart(languagePart: LanguageParts) {
  const languageStoreSelectors = storeSelectorsService.get(Stores.LANGUAGE_STORE);
  const getLanguagePartSelector = languageStoreSelectors.getLanguagePart(languagePart);
  return useSelector(getLanguagePartSelector);
}
