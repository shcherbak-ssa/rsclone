import { StaticLanguage } from '../types/static.types';
import { StaticService } from '../services/static.service';
import { LanguageParts } from '../../common/constants';

export type LanguageResult = {[key: string]: any};

export class LanguageModel {
  private staticService: StaticLanguage = new StaticService();

  async getLanguageParts(language: string, languageParts: LanguageParts[]): Promise<LanguageResult> {
    const readLanguageParts = await this.readLanguagePartFiles(language, languageParts);
    return await this.transformToObject(readLanguageParts);
  }

  private async readLanguagePartFiles(language: string, languageParts: LanguageParts[]) {
    return Promise.all(
      languageParts.map((languagePart) => {
        return this.staticService.readLanguageFile(language, languagePart);
      })
    );
  }

  private async transformToObject(readLanguageParts: [LanguageParts, any][]): Promise<LanguageResult> {
    const resultObject: LanguageResult = {};

    for (const [languagePart, content] of readLanguageParts) {
      resultObject[languagePart] = {...content};
    }

    return resultObject;
  }
}
