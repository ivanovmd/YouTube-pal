import { IpcMain } from "electron";
import { BaseIcpCommunicationUnit } from "./baseIcpCommunicationUnit";


export class IcpMainEventDispatcher extends BaseIcpCommunicationUnit {
  constructor(namespace: string, eventName: string) {
    super(namespace, eventName)
  }

  registerCommunicationFn(fn: any, icpMain: IpcMain) {
    throw new Error("Method not implemented.");
  }
}