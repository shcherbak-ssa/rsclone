import { ErrorNames } from '../../common/constants';
import { ValidationError } from '../../common/validation';
import { ClientError } from '../services/errors.service';
import { RequestCreatorService } from '../services/request-creator.service';
import { RequestSenderService } from '../services/request-sender.service';
import { UrlPathnameService } from '../services/url-pathname.service';
import { RequestCreator, RequestSender, UsersUrlPathname } from '../types/services.types';
import { UserDraftModel } from './user-draft.model';

export class BaseModel {
  protected requestCreator: RequestCreator;
  protected requestSender: RequestSender;
  protected urlPathname: UsersUrlPathname;

  constructor() {
    this.requestCreator = new RequestCreatorService();
    this.requestSender = new RequestSenderService();
    this.urlPathname = new UrlPathnameService();
  }
}

export class BaseDraftModel extends BaseModel {
  protected userDraftModel: UserDraftModel;

  constructor() {
    super();
    this.userDraftModel = new UserDraftModel();
  }

  protected parseError(error: Error) {
    let payload: any;

    switch (error.name) {
      case ErrorNames.VALIDATION_ERROR:
        payload = (error as ValidationError).payload;
        break;
      case ErrorNames.CLIENT_ERROR:
        payload = (error as ClientError).getPayload();
        break;
      default:
        console.log(error);
        return;
    }

    this.userDraftModel.setError(payload.errorLabel, payload.dataLabel);
  }
}
