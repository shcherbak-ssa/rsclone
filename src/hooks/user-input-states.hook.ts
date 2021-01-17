import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';
import { InputState } from '../types/user-draft.types';

export function useUserInputStates(dataLabel: UserDataLabels): InputState {
  const userDraftStoreSelectors = storeSelectorsService.get(Stores.USER_DRAFT_STORE);
  const getInputStatesSelector = userDraftStoreSelectors.getState(dataLabel);
  
  return useSelector(getInputStatesSelector) as InputState;
}
