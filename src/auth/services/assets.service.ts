class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }
}

export const assetsService: AssetsService = new AssetsService();
