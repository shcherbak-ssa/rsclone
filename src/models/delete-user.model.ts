import { Request, Response } from '../types/services.types';
import { BaseModel } from './base.model';

export class DeleteUserModel extends BaseModel {
  async deleteUser(): Promise<any> {
    try {
      const request: Request = this.createRequest();
      const response: Response = await this.requestSender.send(request).delete();
      
      const deletionResult: any = response.parseResponse();
      console.log(deletionResult);
      return false;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private createRequest(): Request {
    return this.requestCreator
      .appendUrlPathname(this.usersPathname)
      .createRequest();
  }
}
