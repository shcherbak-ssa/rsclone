import ms from 'ms';

export class LastUpdatedService {
  static getLastUpdated(lastUpdatedDate: number, languageLabel: string): string {
    const lastUpdatedService: LastUpdatedService = new LastUpdatedService();
    return `${languageLabel} ${lastUpdatedService.getLastUpdated(lastUpdatedDate)}`;
  }

  getLastUpdated(lastUpdatedDate: number): string {
    const currentDate: number = +new Date();
    return ms(currentDate - lastUpdatedDate);
  }
}
