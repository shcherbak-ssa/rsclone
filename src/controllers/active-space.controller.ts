import { Space } from '../../common/entities';
import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';

export const activeSpaceController: Controller = new EventEmitter();

activeSpaceController
  .on(ActiveSpaceEvents.SET_ACTIVE_SPACE, setActiveSpaceHandler)
  .on(ActiveSpaceEvents.REMOVE_ACTIVE_SPACE, removeActiveSpaceHandler);

async function setActiveSpaceHandler(space: Space): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  await activeSpaceModel.setActiveSpace(space);
}

function removeActiveSpaceHandler(): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.removeActiveSpace();
}
