import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { UrlPathnameService } from '../services/url-pathname.service';
import { RequestCreator, RequestSender } from '../types/services.types';

export interface UsersUrlPathname {
  getUsersPathname(): string;
  getAvatarsPathname(): string;
}

export class BaseModel {
  protected requestCreator: RequestCreator;
  protected requestSender: RequestSender;
  private urlPathname: UsersUrlPathname;

  constructor() {
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();
    this.urlPathname = new UrlPathnameService();
  }

  protected getUsersPathname(): string {
    return this.urlPathname.getUsersPathname();
  }

  protected getAvatarsPathname(): string {
    return this.urlPathname.getAvatarsPathname();
  }
}
