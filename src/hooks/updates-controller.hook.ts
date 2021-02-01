import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { KeyboardShortcut } from '../../common/entities';

import { EMPTY_VALUE_LENGTH, Stores, UserDataLabels } from '../constants';
import { UserEvents } from '../constants/events.constants';
import { userController } from '../controllers/user.controller';
import { ShortcutsService } from '../services/shortcuts.service';
import { storeSelectorsService } from '../services/store-selectors.service';
import { UpdatedDataService } from '../services/updated-data.service';
import { UserDataValue } from '../types/user.types';

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
    userController.emit(UserEvents.SYNC_DRAFT);

    return () => {
      userController.emit(UserEvents.SYNC_DRAFT);
    };
  }, []);

  useEffect(() => {
    for (const [dataLabel, currentState] of currentStates.entries()) {
      const updatedValue: UserDataValue = draftStates.get(dataLabel);

      if (dataLabel === UserDataLabels.SHORTCUTS) {
        const updatedShortcuts: KeyboardShortcut[] = ShortcutsService.filterUpdated(
          updatedValue as KeyboardShortcut[],
          currentState,
        );

        changeUpdatedData(
          updatedShortcuts.length !== EMPTY_VALUE_LENGTH,
          dataLabel,
          updatedShortcuts
        );
      } else {
        changeUpdatedData(
          currentState !== updatedValue,
          dataLabel,
          updatedValue,
        );
      }
    }

    setIsUpdatesExist(updatedData.isUpdatesExist());
  });

  function changeUpdatedData(isUpdated: boolean, dataLabel: UserDataLabels, value: any) {
    if (isUpdated) {
      updatedData.add(dataLabel, value);
    } else {
      updatedData.remove(dataLabel);
    }
  }

  return isUpdatesExist;
}
