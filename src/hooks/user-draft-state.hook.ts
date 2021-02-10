import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export function useUserDraftState(dataLabel: UserDataLabels) {
  const userDraftStoreSelectors = storeSelectorsService.get(Stores.USER_DRAFT_STORE);
  const getInputStatesSelector = userDraftStoreSelectors.getState(dataLabel);
  
  return useSelector(getInputStatesSelector);
}
