import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';

export const activeSpaceController: Controller = new EventEmitter();

activeSpaceController.on(ActiveSpaceEvents.SET_IS_OPEN, setIsOpenHandler);

async function setIsOpenHandler(isOpen: boolean): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  await activeSpaceModel.setIsOpen(isOpen);
}
