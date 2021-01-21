import { UniqueModel } from '../models/unique.model';
import { INITIAL_PATHNAME_COUNT, MINUS_REPLACE_STRING } from '../constants';
import { SpacePathname } from '../types/services.types';

export class SpacePathnameService implements SpacePathname {
  private uniqueModel: UniqueModel;

  constructor() {
    this.uniqueModel = new UniqueModel();
  }

  async createSpacePathname(userID: string, spaceName: string): Promise<string> {
    const spacePathname: string = this.createSpacePathnameFromSpaceName(spaceName);
    return await this.getUniqueSpacePathname(userID, spacePathname);
  }

  private createSpacePathnameFromSpaceName(spaceName: string): string {
    return spaceName.toLowerCase().replace(/\s+/g, MINUS_REPLACE_STRING);
  }

  private async getUniqueSpacePathname(
    userID: string, spacePathname: string, initialCount: number = INITIAL_PATHNAME_COUNT
  ): Promise<string> {
    const isUnique: boolean = await this.uniqueModel.isSpacePathnameUnique(userID, spacePathname);

    return isUnique
      ? spacePathname : await this.generateSpacePathname(userID, spacePathname, initialCount);
  }

  private async generateSpacePathname(
    userID: string, spacePathname: string, initialCount: number
  ): Promise<string> {
    spacePathname += initialCount;
    return await this.getUniqueSpacePathname(userID, spacePathname, initialCount += 1);
  }
}
