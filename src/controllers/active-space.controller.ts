import { ActiveSpaceEvents } from '../constants/events.constants';
import { ActiveSpaceModel } from '../models/active-space.model';
import { EventEmitter } from '../services/event-emitter.service';
import { Controller } from '../types/services.types';

export const activeSpaceController: Controller = new EventEmitter();

activeSpaceController
  .on(ActiveSpaceEvents.OPEN_SPACE, openSpaceHandler)
  .on(ActiveSpaceEvents.CLOSE_SPACE, closeSpaceHandler)
  .on(ActiveSpaceEvents.SET_ACTIVE_PAGE, setActivePageHandler);

async function openSpaceHandler(spacePathname: string): Promise<void> {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  await activeSpaceModel.openSpace(spacePathname);
}

function closeSpaceHandler(): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.closeSpace();
}

function setActivePageHandler(pageID: string): void {
  const activeSpaceModel: ActiveSpaceModel = new ActiveSpaceModel();
  activeSpaceModel.setActiveSpaceID(pageID);
}
