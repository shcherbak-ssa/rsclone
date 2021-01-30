import { correctUserAvatarFileTypes } from '../../common/data';
import { DOT_SPLIT_STRING } from '../constants/strings.constants';

export class AssetsService {
  static createHexBackgroundColorStyle(color: string): any {
    return {
      backgroundColor: `#${color}`,
    };
  }

  static createHexColorStyle(color: string): any {
    return {
      color: `#${color}`,
    };
  }

  static createHexPageLinkHoverStyles(color: string): any {
    return {
      borderColor: `#${color}`,
      color: `#${color}`,
    };
  }
  
  getIconUrl(icon: string): string {
    return `/assets/${icon}.svg`;
  }

  getImageUrl(image: string): string {
    return `/assets/${image}.png`;
  }

  isValidUserAvatarFileType(filename: string): boolean {
    const fileType = this.getFileType(filename);
    return correctUserAvatarFileTypes.includes(fileType);
  }

  private getFileType(filename: string): string {
    return filename.split(DOT_SPLIT_STRING).reverse()[0];
  }
}
