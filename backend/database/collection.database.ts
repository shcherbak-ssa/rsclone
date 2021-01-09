import { Collection } from 'mongodb';

export class CollectionDatabase {
  private collection: Collection;

  constructor(collection: Collection) {
    this.collection = collection;
  }
  
  static createCollection(collection: Collection) {
    return new CollectionDatabase(collection);
  }

  async getDocument(query: any, options: any = {}) {
    return this.collection.findOne(query, options);
  }

  async getDocuments() {}

  async createDocument(document: any) {
    const insertDocumentResult = await this.collection.insertOne(document);
    return insertDocumentResult.ops;
  }

  async updateDocument() {}

  async deleteDocument() {}
}
