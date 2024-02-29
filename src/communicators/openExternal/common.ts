import { ICommunicatorApi } from "../base/common"

export type OpenExternalHandlerOptions = 'openExternal'

export const OPEN_EXTERNAL_NAMESPACE = 'openExternal'
export const OPEN_EXTERNAL: OpenExternalHandlerOptions = 'openExternal'

export const openExternalApi: ICommunicatorApi = {
  namespace: OPEN_EXTERNAL_NAMESPACE,
  handlers: [OPEN_EXTERNAL],
  commands: []
}
