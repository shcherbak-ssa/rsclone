class AssetsService {
  public getIconUrl(icon: string) {
    return `./assets/${icon}.svg`;
  }
}

export const assetsService: AssetsService = new AssetsService();
