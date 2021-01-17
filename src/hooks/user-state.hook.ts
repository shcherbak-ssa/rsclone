import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export function useUserState(dataLabel: UserDataLabels) {
  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  return useSelector(userStoreSelectors.getState(dataLabel));
}
