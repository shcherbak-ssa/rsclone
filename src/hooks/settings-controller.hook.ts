import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export type SettingsControllerHookParameters = {
  initialStates: { [key: string]: string };
  checkStatesLabels: UserDataLabels[];
};

export function useSettingsController(
  {initialStates, checkStatesLabels}: SettingsControllerHookParameters
) {
  const [isUpdatesExist, setIsUpdatesExist] = useState(false);

  const userInpustStoreSelectors = storeSelectorsService.get(Stores.USER_INPUTS_STORE);
  const checkStates = useSelector(userInpustStoreSelectors.getStoreStates(checkStatesLabels));

  let updatesFound = false;
  for (const [dataLabel, initialState] of Object.entries(initialStates)) {
    if (initialState !== checkStates[dataLabel]) {
      setIsUpdatesExist(true);
      updatesFound = true;
      break;
    }
  }

  if (!updatesFound) {
    setIsUpdatesExist(false);
  }

  return isUpdatesExist;
}
