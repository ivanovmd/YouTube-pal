import { app } from "electron";
import Datastore from "nedb-promises";
import path from 'path';


export class Databases {
  databases: any;

  constructor(databaseNames: string[]) {
    this.databases = databaseNames.reduce((acc: any, dbName) => {
      acc[dbName] = this.createDb(dbName);
      return acc;
    }, {})
  }

  createDb = (dbname: string) => {
    const dbPath = path.join(app.getPath('userData'), dbname + '.db');

    return Datastore.create({
      filename: dbPath,
      autoload: true,
      timestampData: true
    });
  }

  getDatabases() {
    return this.databases;
  }
}