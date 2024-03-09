import { ICommunicatorApi } from "../base/common"

export type DownloadCoommandOptions = 'downloadProgress' | 'downloadFinish' | 'downloadError'
export type DownloadHandlerOptions = 'downloadStart' | 'currentDownloadVideoId'

export const DOWNLOAD_NAMESPACE = 'fileDonload'
export const DOWNLOAD_START: DownloadHandlerOptions = 'downloadStart'
export const CURRENT_DOWNLOAD_VIDEO_ID: DownloadHandlerOptions = 'currentDownloadVideoId'
export const DOWNLOAD_PROGRESS: DownloadCoommandOptions = 'downloadProgress'
export const DOWNLOAD_FINISH: DownloadCoommandOptions = 'downloadFinish'
export const DOWNLOAD_ERROR: DownloadCoommandOptions = 'downloadError'

export const fileDownloadApi: ICommunicatorApi = {
  namespace: DOWNLOAD_NAMESPACE,
  handlers: [DOWNLOAD_START, CURRENT_DOWNLOAD_VIDEO_ID],
  commands: [DOWNLOAD_PROGRESS, DOWNLOAD_FINISH, DOWNLOAD_ERROR]
}
