export interface DatabaseDB {}

export interface DeleteDatabase {
  delete(): Promise<void>;
  deleteCollection(collectionName: string): Promise<void> 
}
