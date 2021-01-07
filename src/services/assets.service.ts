const correctUserAvatarFileTypes = ['png', 'jpg'];

export class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }

  getImageUrl(image: string) {
    return `/assets/${image}.png`;
  }

  getAvatarImageUrl(image: string) {
    return `/avatars/${image}`;
  }

  isValidUserAvatarFileType(filename: string) {
    const fileType = this.getFileType(filename);
    return correctUserAvatarFileTypes.includes(fileType);
  }

  private getFileType(filename: string) {
    return filename.split('.').reverse()[0];
  }
}
