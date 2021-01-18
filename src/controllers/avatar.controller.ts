import { Stores, UserDataLabels } from '../constants';
import { AvatarEvents } from '../constants/events.constants';
import { EMPTY_STRING } from '../constants/strings.constants';
import { AvatarModel } from '../models/avatar.model';
import { EventEmitter } from '../services/event-emitter.service';
import { StoreManagerService } from '../services/store-manager.service';
import { Controller } from '../types/services.types';
import { StoreManager } from '../types/store.types';
import { UserStore } from '../types/user.types';

export type Avatar = {
  avatarFile: string,
  callback: Function,
};

export const avatarController: Controller = new EventEmitter();

avatarController
  .on(AvatarEvents.CHANGE_AVATAR, changeAvatarHandler);

async function changeAvatarHandler({avatarFile, callback}: Avatar): Promise<void> {
  const avatarModel: AvatarModel = new AvatarModel();
  const storeManager: StoreManager = new StoreManagerService();
  
  const userStore = storeManager.getStore(Stores.USER_STORE) as UserStore;
  const avatarState = userStore.getState(UserDataLabels.AVATAR) as string;

  if (avatarState === EMPTY_STRING) {
    await avatarModel.createAvatar(avatarFile);
  } else {
    await avatarModel.updateAvatar(avatarFile);
    URL.revokeObjectURL(avatarState);
  }

  callback();
}
