import { ipcRenderer } from "electron";
import { databaseOperations } from './constants'



export class DatabaseSliceInvokers {
  invokers: any = {};

  icpInvoker = (operationName: string) => {
    return async (...args: unknown[]) => await ipcRenderer.invoke(operationName, ...args)
  }

  constructor(sliceName: string) {
    databaseOperations.forEach(operation => {
      const callerName = operation + '-' + sliceName;
      this.invokers[callerName] = this.icpInvoker(callerName);
    })
  }

  getInvokers() {
    return this.invokers;
  }
}

