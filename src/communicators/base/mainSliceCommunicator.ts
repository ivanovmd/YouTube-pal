import { BrowserWindow, IpcMain } from "electron"
import { ICommunicatorApi, ICommunicatorApihandlers, IMainCommunicatorContext, formatEventName } from "./common"


export class MainSliceCommunicator {

  namespace: string
  mainWindow: BrowserWindow
  ipcMain: IpcMain
  commands: string[]
  handlers: { [key: string]: (...args: any) => any }

  constructor(api: ICommunicatorApi, context: IMainCommunicatorContext, handlers: ICommunicatorApihandlers) {
    this.registerCommand(api.namespace, api.commands, context)

    api.handlers.forEach(handler => {
      this.registerHandler(api.namespace, handler, handlers[handler], context)
    });
  }

  // send command from main process to renderer
  registerCommand(namespace: string, commands: string[], context: IMainCommunicatorContext) {
    commands.forEach(command => {
      const eventName = formatEventName(namespace, command)
      context.ipcMain.on(eventName, (event, ...args) => {
        return (...args: any) => context.mainWindow.webContents.send('downloadProgress', args)
      })
    })
  }

  // handle commanrs that are received from renderer
  // can also send commands back to renderer
  registerHandler(namespace: string, handlerName: string, handler: (...args: any) => any, context: IMainCommunicatorContext) {
    const eventName = formatEventName(namespace, handlerName)
    context.ipcMain.handle(eventName, (...args) => handler(...args, context))
  }
}