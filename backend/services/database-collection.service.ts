import { Collection } from 'mongodb';

const UNIQUE_COUNT: number = 0;
const LIMIT_UNIQUE_COUNT: number = 1;

export class DatabaseCollectionService {
  private collection: Collection;
  private uniqueOptions: any = { limit: LIMIT_UNIQUE_COUNT };

  constructor(collection: Collection) {
    this.collection = collection;
  }
  
  static createCollection(collection: Collection): DatabaseCollectionService {
    return new DatabaseCollectionService(collection);
  }

  async getDocument(query: any, findOptions: any = {}): Promise<any> {
    return this.collection.findOne(query, findOptions) as any;
  }

  async getDocuments() {}

  async createDocument(document: any): Promise<string> {
    const insertDocumentResult = await this.collection.insertOne(document);
    return insertDocumentResult.ops[0]._id;
  }

  async updateDocument() {}

  async deleteDocument() {}

  async isUnique(query: any): Promise<boolean> {
    const foundDocumentsCount: number
      = await this.collection.countDocuments(query, this.uniqueOptions);

    return foundDocumentsCount === UNIQUE_COUNT
  }
}
