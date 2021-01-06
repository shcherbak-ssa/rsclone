export class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }

  getImageUrl(image: string) {
    return `/assets/${image}.png`;
  }
}
