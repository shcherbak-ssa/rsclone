export class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }

  getImageUrl(image: string) {
    return `/assets/${image}.png`;
  }

  getAvatarImageUrl(image: ArrayBuffer | string) {
    if (typeof(image) === 'string') return image;

    const imageUrl = URL.createObjectURL(image);
    URL.revokeObjectURL(imageUrl);

    return imageUrl;
  }
}
