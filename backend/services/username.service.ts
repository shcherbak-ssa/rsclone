import { MINUS_REPLACE_STRING } from '../constants';
import { UniqueModel } from '../models/unique.model';
import { Username } from '../types/services.types';

export class UsernameService implements Username {
  private uniqueModel: UniqueModel;

  constructor() {
    this.uniqueModel = new UniqueModel();
  }

  async createUsername(email: string): Promise<string> {
    const username: string = this.createUsernameFromEmail(email);
    return await this.getUniqueUsername(username, username[0]);
  }

  private createUsernameFromEmail(email: string): string {
    return email.split('@')[0].replace(/\./g, MINUS_REPLACE_STRING);
  }

  private async generateUsername(firstLetter: string): Promise<string> {
    const username = firstLetter + +new Date();
    return await this.getUniqueUsername(username, firstLetter);
  }

  private async getUniqueUsername(username: string, firstLetter: string): Promise<string> {
    const isUnique: boolean = await this.uniqueModel.isUsernameUnique(username);
    return isUnique ? username : await this.generateUsername(firstLetter);
  }
}
