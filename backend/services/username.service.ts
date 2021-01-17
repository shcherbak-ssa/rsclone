import { UniqueControllerModel } from '../models/unique-controller.model';
import { Username } from '../types/services.types';

export class UsernameService implements Username {
  private uniqueControllerModel: UniqueControllerModel;

  constructor() {
    this.uniqueControllerModel = new UniqueControllerModel();
  }

  async createUsername(email: string): Promise<string> {
    const username: string = this.createUsernameFromEmail(email);
    const isUnique: boolean = await this.uniqueControllerModel.isUsernameUnique(username);

    return isUnique ? username : await this.generateUsername(username[0]);
  }

  private createUsernameFromEmail(email: string): string {
    return email.split('@')[0].replace('.', '-');
  }

  private async generateUsername(letter: string): Promise<string> {
    const username = letter + +new Date();
    const isUnique: boolean = await this.uniqueControllerModel.isUsernameUnique(username);

    return isUnique ? username : await this.generateUsername(letter);
  }
}
