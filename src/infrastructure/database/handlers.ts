import { ipcMain } from "electron"
import { databaseOperations } from './constants'



export class DatabaseSliceHandlers {
  handlers: any[];

  constructor(sliceName: string, db: any) {
    this.handlers = databaseOperations.map(operation => {
      return this.icpHandler(operation + '-' + sliceName, db, operation);
    })
  }

  icpHandler(operationName: string, db: any, handler: string) {
    return ipcMain.handle(operationName, async (_, ...args) => await db[handler](...args))
  }

  getHandlers() {
    return this.handlers;
  }
}