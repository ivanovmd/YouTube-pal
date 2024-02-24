import { IpcRenderer } from "electron";
import { BaseIcpCommunicationUnit } from "./baseIcpCommunicationUnit";


// this is the class that can call api registered in renderer's contextBridge
export class IcpRendererEventDispatcherBase extends BaseIcpCommunicationUnit {
  apiName: string

  constructor(namespace: string, eventName: string, apiName: string) {
    super(namespace, eventName);
    this.apiName = apiName;
  }

  registerCommunicationFn() {
    this.communicationFn = (...args: any) => window[this.apiName][this.namespace + this.eventName](...args)
  }
}
