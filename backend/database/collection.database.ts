import { Collection } from 'mongodb';

export class CollectionDatabase {
  private collection: Collection;
  private findOneOptions: any = {
    projection: { _id: 0 },
  };

  constructor(collection: Collection) {
    this.collection = collection;
  }
  
  static createCollection(collection: Collection) {
    return new CollectionDatabase(collection);
  }

  async getDocument(query: any, options: any = {}) {
    const findOneOptions = {...options, ...this.findOneOptions};
    return this.collection.findOne(query, findOneOptions) as any;
  }

  async getDocuments() {}

  async createDocument(document: any) {
    const insertDocumentResult = await this.collection.insertOne(document);
    return insertDocumentResult.ops;
  }

  async updateDocument() {}

  async deleteDocument() {}
}
