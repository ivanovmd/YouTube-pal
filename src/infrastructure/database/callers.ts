import { databaseOperations } from "./constants";

export class DatabaseSliceCallers {
  callers: any = {};

  constructor(databaseName: string) {
    databaseOperations.forEach(operation => {
      this.callers[operation] = this.caller(operation + '-' + databaseName);
    })
  }

  caller(operationName: string) {
    return (...args: any) => window.database[operationName](...args)
  }

  getCallers() {
    return this.callers;
  }
}