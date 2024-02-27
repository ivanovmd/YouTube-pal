import { ICommunicatorApi } from "../base/common"

export const fileDownloadApi: ICommunicatorApi = {
  namespace: 'fileDonload',
  handlers: ['downloadStart'],
  commands: ['downloadProgress', 'downloadFinish', 'downloadError']
}
