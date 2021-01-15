import { ResponseSender } from './services.types';

export type ControllerData = {
  body?: any,
  userID?: string,
  responseSender: ResponseSender,
};
