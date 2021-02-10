import { ServerError } from '../services/errors.service';

export class BaseController {
  protected unknowUserIDError() {
    return new ServerError(
      'Unknow user id',
      {
        error: 'Some problems with code',
      },
    );
  }
}
