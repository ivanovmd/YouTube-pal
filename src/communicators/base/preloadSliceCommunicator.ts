import { ICommunicatorApi, IRendererCommunicatorContext, formatEventName } from './common'


export class PreloadSliceCommunicator {
  constructor(api: ICommunicatorApi, context: IRendererCommunicatorContext) {
    this.registerContextBridgeApi(context, api.namespace, api.commands, api.handlers)
  }


  registerContextBridgeApi(context: IRendererCommunicatorContext, namespace: string, commands: string[], handlers: string[]) {
    const invokersObj = handlers.reduce((acc: any, eventName: string) => {
      eventName = formatEventName(namespace, eventName)
      acc[eventName] = (...args: any) => {
        return context.ipcRenderer.invoke(eventName, ...args)
      }
      return acc
    }, {})

    const handlersObj = commands.reduce((acc: any, command: string) => {
      const commandName = formatEventName(namespace, command)
      acc[commandName] = (callback: any) => context.ipcRenderer.on(commandName, (event, value) => callback(value))
      return acc
    }, {})

    context.contextBridge.exposeInMainWorld(namespace, {
      ...invokersObj,
      ...handlersObj
    })
  }
}