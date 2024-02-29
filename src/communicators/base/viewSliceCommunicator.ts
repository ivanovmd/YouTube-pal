import { ICommunicatorApi, formatEventName } from "./common"


export class ViewSliceCommunicator {
  call: { [key: string]: (...args: any) => void } = {}
  on: { [key: string]: (...args: any) => void } = {}
  constructor(api: ICommunicatorApi, window: Window) {
    api.handlers.forEach((command: any) => {
      const eventName = formatEventName(api.namespace, command)
      this.call[command] = (...args: any) => window[api.namespace][eventName](...args)
    })

    api.commands.forEach(handler => {
      const eventName = formatEventName(api.namespace, handler)
      this.on[handler] = (...args: any) => window[api.namespace][eventName](...args)
    })
  }
}
