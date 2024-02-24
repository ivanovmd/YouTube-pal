import { IpcMain } from "electron";
import { BaseIcpCommunicationUnit } from "./baseIcpCommunicationUnit";

export class IcpMainEventDispatcherBase extends BaseIcpCommunicationUnit {

  constructor(namespace: string, eventName: string) {
    super(namespace, eventName);
  }

  registerCommunicationFn(fn: any, ipcMain: IpcMain) {
    this.communicationFn = () => ipcMain.handle(this.namespace + this.eventName, async (_, ...args) => await fn(...args))
  }
}
