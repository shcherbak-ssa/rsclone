import { AvatarEvents } from '../constants/events.constants';
import { AvatarModel } from '../models/avatar.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';

export type CreateAvatar = {
  avatarFile: string,
  callback: Function,
};

export const avatarController: Controller = new EventEmitter();

avatarController
  .on(AvatarEvents.CREATE_AVATAR, createAvatarHandler);

async function createAvatarHandler({avatarFile, callback}: CreateAvatar): Promise<void> {
  const avatarModel: AvatarModel = new AvatarModel();
  await avatarModel.createAvatar(avatarFile);

  callback();
}
