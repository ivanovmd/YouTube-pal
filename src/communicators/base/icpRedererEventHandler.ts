import { ContextBridge, IpcRenderer } from "electron";
import { BaseIcpCommunicationUnit } from "./baseIcpCommunicationUnit";

type HandlerType = 'on' | 'invoke'

export class IcpRedererEventHandlerBase extends BaseIcpCommunicationUnit {
  apiName: string

  constructor(namespace: string, eventName: string, apiName: string) {
    super(namespace, eventName);
    this.apiName = apiName;
  }

  registerCommunicationFn(ipcRenderer: IpcRenderer, contextBridge: ContextBridge, handlerType: HandlerType = 'invoke') {
    this.communicationFn = async (...args: unknown[]) => await ipcRenderer[handlerType](this.namespace + this.eventName, ...args)

    contextBridge.exposeInMainWorld(this.apiName, {
      [this.namespace + this.eventName]: this.communicationFn,
    })
  }
}
