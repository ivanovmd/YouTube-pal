import { ICommunicatorApi } from "../base/common"

export type SelectDirectoryHandlerOptions = 'selectDirectory'

export const SELECT_DIRECTORY_NAMESPACE = 'selectDirectory'
export const SELECT_DIRECTORY: SelectDirectoryHandlerOptions = 'selectDirectory'

export const selectDirectoryApi: ICommunicatorApi = {
  namespace: SELECT_DIRECTORY_NAMESPACE,
  handlers: [SELECT_DIRECTORY],
  commands: []
}
