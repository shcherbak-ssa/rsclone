import { UserDraftEvents, UserEvents } from '../constants/events.constants';
import { userDraftController } from '../controllers/user-draft.controller';
import { ActiveSpace, userController } from '../controllers/user.controller';
import { resetActiveSpaceData, spacesDataLabels } from '../data/spaces.data';

export class SpacesService {
  resetSpaceStates() {
    const activeSpace: ActiveSpace = {
      space: resetActiveSpaceData,
      callback: () => {},
    };

    userController.emit(UserEvents.SET_ACTIVE_SPACE, activeSpace);
    userDraftController.emit(UserDraftEvents.RESET_STATES, spacesDataLabels);
  }
}
