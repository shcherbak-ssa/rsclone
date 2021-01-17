import { correctUserAvatarFileTypes } from '../../common/data';
import { DOT_SPLIT_STRING } from '../constants';

export class AssetsService {
  getIconUrl(icon: string) {
    return `/assets/${icon}.svg`;
  }

  getImageUrl(image: string) {
    return `/assets/${image}.png`;
  }

  isValidUserAvatarFileType(filename: string) {
    const fileType = this.getFileType(filename);
    return correctUserAvatarFileTypes.includes(fileType);
  }

  private getFileType(filename: string) {
    return filename.split(DOT_SPLIT_STRING).reverse()[0];
  }
}
