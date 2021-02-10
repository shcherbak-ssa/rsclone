import { UserDataLabels } from '../constants';
import { UserDraftEvents } from '../constants/events.constants';
import { UpdatedDraftValue, userDraftController } from '../controllers/user-draft.controller';

export function useUserInputUpdate(dataLabel: UserDataLabels) {
  function updateValue(newValue: string) {
    const updatedDraftValue: UpdatedDraftValue = {
      value: newValue,
      dataLabel,
    };

    userDraftController.emit(UserDraftEvents.UPDATE_VALUE, updatedDraftValue);
  }

  return updateValue;
}
