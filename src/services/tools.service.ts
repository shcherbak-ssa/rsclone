import { EMPTY_STRING } from '../constants/strings.constants';
import { InitialInputState, OpenSpacePathnames } from '../types/tools.types';
import { InputState } from '../types/user-draft.types';

const SPLITED_LOCATION_PATHNAME_LENGTH_WITHOUT_PAGE_PATHNAME: number = 4;

export class ToolsService implements InitialInputState, OpenSpacePathnames {
  getInitialInputState(): InputState {
    return {
      value: '',
      error: '',
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
    const splitedLocationPathname: string[] = location.pathname.split('/').reverse();

    if (splitedLocationPathname.length === SPLITED_LOCATION_PATHNAME_LENGTH_WITHOUT_PAGE_PATHNAME) {
      return {
        spacePathname: splitedLocationPathname[0],
        pagePathname: EMPTY_STRING,
      };
    }

    return {
      spacePathname: splitedLocationPathname[1],
      pagePathname: splitedLocationPathname[0],
    };
  }
}
