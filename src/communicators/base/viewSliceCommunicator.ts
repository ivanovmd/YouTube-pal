import { ICommunicatorApi, formatEventName } from "./common"


export class ViewSliceCommunicator {
  call: { [key: string]: (...args: any) => any } = {}
  on: { [key: string]: (...args: any) => any } = {}
  constructor(api: ICommunicatorApi, window: Window) {
    api.handlers.forEach((command: any) => {
      const eventName = formatEventName(api.namespace, command)
      this.call[command] = async (...args: any) => await window[api.namespace][eventName](...args)
    })

    api.commands.forEach(handler => {
      const eventName = formatEventName(api.namespace, handler)
      this.on[handler] = async (...args: any) => await window[api.namespace][eventName](...args)
    })
  }
}
