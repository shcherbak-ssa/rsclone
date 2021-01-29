import { UniqueModel } from '../models/unique.model';
import { EMPTY_STRING, INITIAL_PATHNAME_COUNT, MINUS_REPLACE_STRING } from '../constants';
import { PagePathname } from '../types/services.types';

export class PagePathnameService implements PagePathname {
  private uniqueModel: UniqueModel;

  constructor() {
    this.uniqueModel = new UniqueModel();
  }

  async createPagePathname(
    userID: string, spaceID: string, pageTitle: string
  ): Promise<string> {
    const pagePathname: string = this.createPagePathnameFromPageTitle(pageTitle);
    return await this.getUniquePagePathname(userID, spaceID, pagePathname);
  }

  private createPagePathnameFromPageTitle(pageTitle: string): string {
    return pageTitle
      .toLowerCase()
      .replace(/[!@#$%^&*\(\)\[\]\{\}+=?\/<>]/g, EMPTY_STRING)
      .replace(/\s+/g, MINUS_REPLACE_STRING);
  }

  private async getUniquePagePathname(
    userID: string,
    spaceID: string,
    pagePathname: string,
    initialCount: number = INITIAL_PATHNAME_COUNT
  ): Promise<string> {
    const isUnique: boolean
      = await this.uniqueModel.isPagePathnameUnique(userID, spaceID, pagePathname);

    return isUnique
      ? pagePathname : await this.generateSpacePathname(userID, spaceID, pagePathname, initialCount);
  }

  private async generateSpacePathname(
    userID: string, spaceID: string, pagePathname: string, initialCount: number
  ): Promise<string> {
    pagePathname += initialCount;
    return await this.getUniquePagePathname(userID, spaceID, pagePathname, initialCount += 1);
  }
}
