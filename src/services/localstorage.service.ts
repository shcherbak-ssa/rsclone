export class LocalStorageService {
  save(storageLabel: string, payload: object): void {
    const storageItem = JSON.stringify(payload);
    localStorage.setItem(storageLabel, storageItem);
  }

  remove(storageLabel: string): void {
    localStorage.removeItem(storageLabel);
  }

  get(storageLabel: string): any | null {
    const storage = localStorage.getItem(storageLabel);
    return storage ? JSON.parse(storage) : null;
  }

  exist(storageLabel: string): boolean {
    return !!localStorage.getItem(storageLabel);
  }
}
