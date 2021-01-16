import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { UserDraftEvents } from '../constants/events.constants';
import { userDraftController } from '../controllers/user-draft.controller';
import { storeSelectorsService } from '../services/store-selectors.service';
import { UpdatedDataService } from '../services/updated-data.service';

export type UpdatesControllerHookParams = {
  controlDataLabels: UserDataLabels[],
  updatedData: UpdatedDataService,
};

export function useUpdatesController({
  controlDataLabels, updatedData,
}: UpdatesControllerHookParams) {
  const [isUpdatesExist, setIsUpdatesExist] = useState(false);

  const userStoreSelectors = storeSelectorsService.get(Stores.USER_STORE);
  const currentStates = useSelector(userStoreSelectors.getStoreStates(controlDataLabels));

  const userDraftStoreSelectors = storeSelectorsService.get(Stores.USER_DRAFT_STORE);
  const draftStates = useSelector(userDraftStoreSelectors.getStoreStates(controlDataLabels));

  useEffect(() => {
    return () => {
      userDraftController.emit(UserDraftEvents.RESET_STATES, controlDataLabels);
    };
  }, []);

  useEffect(() => {
    for (const [dataLabel, initialState] of currentStates.entries()) {
      const updatedValue = draftStates.get(dataLabel);

      if (initialState !== draftStates.get(dataLabel)) {
        updatedData.add(dataLabel, updatedValue);
      } else {
        updatedData.remove(dataLabel);
      }
    }

    setIsUpdatesExist(updatedData.isUpdatesExist());
  });

  return isUpdatesExist;
}
