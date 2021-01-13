import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { storeSelectorsService } from '../services/store-selectors.service';

export type UpdatesControllerHookParameters = {
  initialStates: { [key: string]: string };
};

export function useUpdatesController(
  {initialStates}: UpdatesControllerHookParameters
) {
  const [isUpdatesExist, setIsUpdatesExist] = useState(false);

  const userInpustStoreSelectors = storeSelectorsService.get(Stores.USER_INPUTS_STORE);
  const checkStatesLabels = Object.keys(initialStates) as UserDataLabels[];
  const checkStates = useSelector(userInpustStoreSelectors.getStoreStates(checkStatesLabels));

  useEffect(() => {
    let updatesFound = false;
    for (const [dataLabel, initialState] of Object.entries(initialStates)) {
      if (initialState !== checkStates.get(dataLabel)) {
        updatesFound = true;
        break;
      }
    }

    setIsUpdatesExist(updatesFound);
  }, [checkStates])

  return isUpdatesExist;
}
