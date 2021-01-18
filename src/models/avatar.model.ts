import { AVATAR_LABEL } from '../../common/constants';
import { Request, Response } from '../types/services.types';
import { BaseModel } from './base.model';

export class AvatarModel extends BaseModel {
  async createAvatar(avatarFile: string): Promise<void> {
    try {
      const avatarBlobFile: Blob = await this.createBlobFromAvatarFile(avatarFile);
      const request: Request = this.createRequest(avatarBlobFile);
      const response: Response = await this.requestSender.send(request).create();
      response.parseResponse();
    } catch (error) {
      console.log(error);
    }
  }

  private async createBlobFromAvatarFile(avatarFile: string): Promise<Blob> {
    return await fetch(avatarFile).then((result) => result.blob());
  }

  private createRequest(avatarBlobFile: Blob): Request {
    const pathname: string = this.getAvatarsPathname();
    const formData: FormData = new FormData();
    formData.append(AVATAR_LABEL, avatarBlobFile);

    return this.requestCreator
      .appendUrlPathname(pathname)
      .setBody(formData)
      .createRequest();
  }
}
