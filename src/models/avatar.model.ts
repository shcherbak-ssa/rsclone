import { AVATAR_LABEL } from '../../common/constants';
import { Request, Response } from '../types/services.types';
import { BaseModel } from './base.model';

export class AvatarModel extends BaseModel {
  async getAvatar(): Promise<string> {
    try {
      const request: Request = this.getGetRequest();
      const response: Response = await this.requestSender.send(request).get();
      const avatarBlob: Blob = response.parseResponse();

      return URL.createObjectURL(avatarBlob);
    } catch (error) {
      console.log(error);
    }
  }

  async createAvatar(avatarFile: string): Promise<void> {
    try {
      const avatarBlobFile: Blob = await this.createBlobFromAvatarFile(avatarFile);
      const request: Request = this.getCreateRequest(avatarBlobFile);
      const response: Response = await this.requestSender.send(request).create();
      response.parseResponse();
    } catch (error) {
      console.log(error);
    }
  }

  private async createBlobFromAvatarFile(avatarFile: string): Promise<Blob> {
    return await fetch(avatarFile).then((result) => result.blob());
  }

  private getGetRequest(): Request {
    const pathname: string = this.getAvatarsPathname();

    return this.requestCreator
      .appendUrlPathname(pathname)
      .createRequest();
  }

  private getCreateRequest(avatarBlobFile: Blob): Request {
    const pathname: string = this.getAvatarsPathname();
    const formData: FormData = new FormData();
    formData.append(AVATAR_LABEL, avatarBlobFile);

    return this.requestCreator
      .appendUrlPathname(pathname)
      .setBody(formData)
      .createRequest();
  }
}
