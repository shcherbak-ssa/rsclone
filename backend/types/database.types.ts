export interface DatabaseDB {}

export interface DeleteDatabase {
  delete(): Promise<void>;
}
