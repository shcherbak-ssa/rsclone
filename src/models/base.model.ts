import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { UrlPathnameService } from '../services/url-pathname.service';
import { RequestCreator, RequestSender } from '../types/services.types';

export interface UsersUrlPathname {
  getUsersPathname(): string;
}

export class BaseModel {
  protected requestCreator: RequestCreator;
  protected requestSender: RequestSender;
  protected usersPathname: string

  constructor() {
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();
    
    const urlPathname: UsersUrlPathname = new UrlPathnameService();
    this.usersPathname = urlPathname.getUsersPathname();
  }
}
