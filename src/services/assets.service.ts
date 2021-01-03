export class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }
}
