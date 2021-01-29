import { ResponseSender } from './services.types';

export type ControllerData = {
  body?: any,
  userID?: string,
  spaceID?: string,
  responseSender: ResponseSender,
};
