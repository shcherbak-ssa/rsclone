import { EMPTY_VALUE_LENGTH, UserDataLabels } from '../constants';

export class UpdatedDataService {
  private updatedData: Map<string, boolean>;

  constructor(controlDataLabels: UserDataLabels[]) {
    this.updatedData = new Map();

    for (const dataLabel of controlDataLabels) {
      this.remove(dataLabel);
    }
  }

  isUpdatesExist() {
    return this.getUpdated().length !== EMPTY_VALUE_LENGTH;
  }

  add(dataLabel: UserDataLabels): void {
    this.updatedData.set(dataLabel, true);
  }

  remove(dataLabel: UserDataLabels): void {
    this.updatedData.set(dataLabel, false);
  }

  getUpdated() {
    const updated = [];

    for (const [dataLabel, isUpdated] of this.updatedData.entries()) {
      if (isUpdated) updated.push(dataLabel);
    }

    return updated;
  }
}
