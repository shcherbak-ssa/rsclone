import { ControllerData } from '../types/controller.types';
import { ServerError } from '../services/errors.service';

export class BaseController {
  async runController(action: any, {userID, body, responseSender}: ControllerData): Promise<any> {
    try {
      if (!userID) throw this.unknowUserIDError();
      return await this.doAction(action, userID, body);
    } catch (error) {
      await responseSender.sendErrorResponse(error);
    }
  }

  protected async doAction(...params: any[]): Promise<any> {}

  private unknowUserIDError() {
    return new ServerError(
      'Unknow user id',
      {
        error: 'Some problems with code',
      },
    );
  }
}
