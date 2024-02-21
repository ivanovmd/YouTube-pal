import { BRIDGE_NAME, DatabaseOperation, databaseOperations } from "./constants";


type Callers = {
  [key in DatabaseOperation]?: (...args: any) => Promise<any>;
};

export class DatabaseSliceCallers {
  callers: Callers = {};

  constructor(databaseName: string) {
    databaseOperations.forEach(operation => {
      this.callers[operation] = this.caller(operation + '-' + databaseName);
    })
  }

  caller(operationName: string) {
    return (...args: any) => window[BRIDGE_NAME][operationName](...args)
  }

  getCallers() {
    return this.callers;
  }
}