import { LogoutService } from '../services/logout.service';
import { Logout, Request, Response } from '../types/services.types';
import { BaseModel } from './base.model';

export class UserDeleteModel extends BaseModel {
  async deleteUser(): Promise<boolean> {
    try {
      const request: Request = this.createRequest();
      const response: Response = await this.requestSender.send(request).delete();
      const deletionResult: any = response.parseResponse();
      
      if (deletionResult.deleted) {
        const logout: Logout = new LogoutService();
        logout.logoutUser();
      }

      return deletionResult.deleted;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private createRequest(): Request {
    const usersPathname: string = this.urlPathname.getUsersPathname();

    return this.requestCreator
      .appendUrlPathname(usersPathname)
      .createRequest();
  }
}
