import { AVATAR_LABEL, ErrorNames } from '../../common/constants';
import { UserDataLabels } from '../constants';
import { EMPTY_STRING } from '../constants/strings.constants';
import { ClientError } from '../services/errors.service';
import { Request, Response } from '../types/services.types';
import { UpdatedData } from '../types/user.types';
import { BaseModel } from './base.model';
import { UserDraftModel } from './user-draft.model';
import { UserModel } from './user.model';

export class AvatarModel extends BaseModel {
  async getAvatar(): Promise<string> {
    try {
      const request: Request = this.createRequestWithoutFile();
      const response: Response = await this.requestSender.send(request).get();
      const avatarBlob: Blob = response.parseResponse();

      return URL.createObjectURL(avatarBlob);
    } catch (error) {
      console.log(error);
    }
  }

  async createAvatar(avatarFile: string): Promise<void> {
    try {
      const request: Request = await this.createRequestWithFile(avatarFile);
      const response: Response = await this.requestSender.send(request).create();
      response.parseResponse();

      this.updateUserAvatarState(avatarFile);
    } catch (error) {
      this.parseError(error);
    }
  }

  async updateAvatar(avatarFile: string): Promise<void> {
    try {
      const request: Request = await this.createRequestWithFile(avatarFile);
      const response: Response = await this.requestSender.send(request).update();
      response.parseResponse();
      
      this.updateUserAvatarState(avatarFile);
    } catch (error) {
      this.parseError(error);
    }
  }

  async deleteAvatar(): Promise<void> {
    try {
      const request: Request = this.createRequestWithoutFile();
      const response: Response = await this.requestSender.send(request).delete();
      response.parseResponse();
      
      this.updateUserAvatarState(EMPTY_STRING);
    } catch (error) {
      console.log(error);
    }
  }

  private createRequestWithoutFile(): Request {
    const pathname: string = this.getAvatarsPathname();

    return this.requestCreator
      .appendUrlPathname(pathname)
      .createRequest();
  }

  private async createRequestWithFile(avatarFile: string): Promise<Request> {
    const pathname: string = this.getAvatarsPathname();

    const avatarBlobFile: Blob = await this.createBlobFromAvatarFile(avatarFile);
    const formData: FormData = new FormData();
    formData.append(AVATAR_LABEL, avatarBlobFile);


    return this.requestCreator
      .appendUrlPathname(pathname)
      .setBody(formData)
      .createRequest();
  }

  private async createBlobFromAvatarFile(avatarFile: string): Promise<Blob> {
    return await fetch(avatarFile).then((result) => result.blob());
  }

  private updateUserAvatarState(avatarFile: string): void {
    const userModel: UserModel = new UserModel();
    const updatedAvatarState: UpdatedData = {
      [UserDataLabels.AVATAR]: avatarFile,
    };

    userModel.updateStates(updatedAvatarState);
  }

  private parseError(error: Error) {
    if (error.name === ErrorNames.CLIENT_ERROR) {
      const userDraftModel: UserDraftModel = new UserDraftModel();
      const payload = (error as ClientError).getPayload();

      userDraftModel.setError(payload.errorLabel, payload.dataLabel);
    } else {
      console.log(error);
    }
  }
}
