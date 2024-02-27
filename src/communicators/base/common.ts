import { BrowserWindow, ContextBridge, IpcMain, IpcRenderer } from "electron"

export interface CommunicatorApi {
  namespace: string
  eventNames: string[]
  eventHandlers?: string[]
}


export interface ICommunicatorApi {
  namespace: string
  commands: string[],
  handlers: string[]
}

export interface ICommunicatorApihandlers {
  [key: string]: (...args: any) => any
}

export interface IRendererCommunicatorContext {
  ipcRenderer: IpcRenderer
  contextBridge: ContextBridge
}

export interface IMainCommunicatorContext {
  mainWindow: BrowserWindow
  ipcMain: IpcMain
}


export const formatEventName = (namespace: string, eventName: string) => `${namespace}_${eventName}`


