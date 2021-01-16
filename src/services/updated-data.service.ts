import { EMPTY_VALUE_LENGTH, UserDataLabels } from '../constants';
import { UpdatedData } from '../types/user.types';

export class UpdatedDataService {
  private updatedData: Map<string, any>;

  constructor() {
    this.updatedData = new Map();
  }

  isUpdatesExist() {
    return this.updatedData.size !== EMPTY_VALUE_LENGTH;
  }

  add(dataLabel: UserDataLabels, value: any): void {
    this.updatedData.set(dataLabel, value);
  }

  remove(dataLabel: UserDataLabels): void {
    this.updatedData.delete(dataLabel);
  }

  get(): UpdatedData {
    const updatedData: UpdatedData = {};

    for (const [dataLabel, value] of this.updatedData.entries()) {
      updatedData[dataLabel] = value;
    }

    return updatedData;
  }
}
