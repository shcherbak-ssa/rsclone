import { EMPTY_STRING, SLASH } from '../constants/strings.constants';
import { InitialInputState, OpenSpacePathnames } from '../types/tools.types';
import { InputState } from '../types/user-draft.types';

const SPLITED_LOCATION_PATHNAME_LENGTH_WITHOUT_PAGE_PATHNAME: number = 4;

export class ToolsService implements InitialInputState, OpenSpacePathnames {
  getInitialInputState(): InputState {
    return {
      value: EMPTY_STRING,
      error: EMPTY_STRING,
    };
  }

  getSelectedItem(items: Array<{label: string}>, label: string): {label: string} {
    return items.find((item) => item.label === label);
  }

  getRandomNumber(min: number, max: number) {
    const randomNumber: number = min + Math.random() * (max + 1 - min);
    return Math.floor(randomNumber);
  }

  getElements(from: any[], start: number, count: number): any[] {
    return from.slice(start, start + count);
  }

  getOpenSpacePathnames(): {
    spacePathname: string,
    pagePathname: string,
  } {
    const splitedLocationPathname: string[] = location.pathname.split(SLASH).reverse();
    const decodePathname = this.getPathnameDecoder(splitedLocationPathname);

    if (splitedLocationPathname.length === SPLITED_LOCATION_PATHNAME_LENGTH_WITHOUT_PAGE_PATHNAME) {
      return {
        spacePathname: decodePathname(0),
        pagePathname: EMPTY_STRING,
      };
    }

    return {
      spacePathname: decodePathname(1),
      pagePathname: decodePathname(0),
    };
  }

  private getPathnameDecoder(splitedLocationPathname: string[]) {
    return (index: number): string => {
      return decodeURIComponent(splitedLocationPathname[index]);
    }
  }
}
