import { Space } from '../../common/entities';
import { UserDraftEvents, UserEvents } from '../constants/events.constants';
import { DraftActiveSpace, userDraftController } from '../controllers/user-draft.controller';
import { ActiveSpace, userController } from '../controllers/user.controller';

export function useSetActiveSpace(): Function {
  function setActiveSpace(space: Space, callback: Function) {
    const activeSpace: ActiveSpace = { space, callback };
    userController.emit(UserEvents.SET_ACTIVE_SPACE, activeSpace);
  }

  function setDraftActiveSpace(space: Space, callback: Function) {
    const draftActiveSpace: DraftActiveSpace = { space, callback };
    userDraftController.emit(UserDraftEvents.SET_ACTIVE_SPACE, draftActiveSpace);
  }

  return (space: Space, callback: Function) => {
    setActiveSpace(space, () => {
      setDraftActiveSpace(space, () => {
        callback();
      });
    });
  };
}
