import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { Stores, UserDataLabels } from '../constants';
import { UserInputsEvents } from '../constants/events.constants';
import { userInputsController } from '../controllers/user-inputs.controller';
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

  const userInpustStoreSelectors = storeSelectorsService.get(Stores.USER_INPUTS_STORE);
  const updatedStates = useSelector(userInpustStoreSelectors.getStoreStates(controlDataLabels));

  useEffect(() => {
    return () => {
      userInputsController.emit(UserInputsEvents.RESET_STATES, controlDataLabels);
    };
  }, []);

  useEffect(() => {
    for (const [dataLabel, initialState] of currentStates.entries()) {
      const updatedValue = updatedStates.get(dataLabel);

      if (initialState !== updatedStates.get(dataLabel)) {
        updatedData.add(dataLabel, updatedValue);
      } else {
        updatedData.remove(dataLabel);
      }
    }

    setIsUpdatesExist(updatedData.isUpdatesExist());
  });

  return isUpdatesExist;
}
