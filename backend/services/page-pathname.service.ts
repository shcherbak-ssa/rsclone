import { UniqueModel } from '../models/unique.model';
import { EMPTY_STRING, INITIAL_PATHNAME_COUNT } from '../constants';
import { PagePathname } from '../types/services.types';
import { PathnameService } from './pathname.service';

export class PagePathnameService implements PagePathname {
  private uniqueModel: UniqueModel;
  private pathnameService: PathnameService;

  constructor() {
    this.uniqueModel = new UniqueModel();
    this.pathnameService = new PathnameService();
  }

  async createPagePathname(
    userID: string, spaceID: string, pageTitle: string
  ): Promise<string> {
    const pagePathname: string = this.createPagePathnameFromPageTitle(pageTitle);
    return await this.getUniquePagePathname(userID, spaceID, pagePathname);
  }

  private createPagePathnameFromPageTitle(pageTitle: string): string {
    return this.pathnameService
      .replaceSpaces(pageTitle)
      .replace(/[!@#$%^&*\(\)\[\]\{\}+=?\/<>]/g, EMPTY_STRING)
  }

  private async getUniquePagePathname(
    userID: string,
    spaceID: string,
    pagePathname: string,
    count: number = INITIAL_PATHNAME_COUNT
  ): Promise<string> {
    const isUnique: boolean
      = await this.uniqueModel.isPagePathnameUnique(userID, spaceID, pagePathname);

    return isUnique
      ? pagePathname : await this.generateSpacePathname(userID, spaceID, pagePathname, count);
  }

  private async generateSpacePathname(
    userID: string, spaceID: string, pagePathname: string, count: number
  ): Promise<string> {
    pagePathname = this.pathnameService.appendCount(pagePathname, count);
    return await this.getUniquePagePathname(userID, spaceID, pagePathname, count += 1);
  }
}
