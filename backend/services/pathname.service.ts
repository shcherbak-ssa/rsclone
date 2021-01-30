import { INITIAL_PATHNAME_COUNT, MINUS_REPLACE_STRING } from '../constants';

export class PathnameService {
  replaceSpaces(value: string): string {
    return value.toLowerCase().replace(/\s+/g, MINUS_REPLACE_STRING);
  }

  appendCount(pathname: string, count: number): string {
    return (count === INITIAL_PATHNAME_COUNT)
      ? pathname + count
      : pathname.replace(/\d+$/, `${count}`);
  }
}
