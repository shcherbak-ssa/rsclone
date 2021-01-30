import { UniqueModel } from '../models/unique.model';
import { INITIAL_PATHNAME_COUNT } from '../constants';
import { SpacePathname } from '../types/services.types';
import { PathnameService } from './pathname.service';

export class SpacePathnameService implements SpacePathname {
  private uniqueModel: UniqueModel;
  private pathnameService: PathnameService;

  constructor() {
    this.uniqueModel = new UniqueModel();
    this.pathnameService = new PathnameService();
  }

  async createSpacePathname(userID: string, spaceName: string): Promise<string> {
    const spacePathname: string = this.createSpacePathnameFromSpaceName(spaceName);
    return await this.getUniqueSpacePathname(userID, spacePathname);
  }

  private createSpacePathnameFromSpaceName(spaceName: string): string {
    return this.pathnameService.replaceSpaces(spaceName);
  }

  private async getUniqueSpacePathname(
    userID: string, spacePathname: string, count: number = INITIAL_PATHNAME_COUNT
  ): Promise<string> {
    const isUnique: boolean = await this.uniqueModel.isSpacePathnameUnique(userID, spacePathname);

    return isUnique
      ? spacePathname : await this.generateSpacePathname(userID, spacePathname, count);
  }

  private async generateSpacePathname(
    userID: string, spacePathname: string, count: number
  ): Promise<string> {
    spacePathname = this.pathnameService.appendCount(spacePathname, count);
    return await this.getUniqueSpacePathname(userID, spacePathname, count += 1);
  }
}
