import { DownloadService } from "../../services/downloadService"
import { ICommunicatorApihandlers, formatEventName } from "../base/common"
import { CURRENT_DOWNLOAD_VIDEO_ID, DOWNLOAD_CANCEL, DOWNLOAD_ERROR, DOWNLOAD_FINISH, DOWNLOAD_PROGRESS, DOWNLOAD_START, fileDownloadApi } from "./common"

export const fileDownloadHandlers: ICommunicatorApihandlers = {
  [DOWNLOAD_START]: (event, downloadDestination, videoId, videoName, downloadOptions = {}, context) => {
    console.log(DOWNLOAD_START);
    const downloadProgress = formatEventName(fileDownloadApi.namespace, DOWNLOAD_PROGRESS)
    const downloadFinish = formatEventName(fileDownloadApi.namespace, DOWNLOAD_FINISH)
    const downloadError = formatEventName(fileDownloadApi.namespace, DOWNLOAD_ERROR)
    const downloadService = DownloadService.getInstance(downloadDestination, downloadOptions)
    const onProgress = (...args: any) => context.mainWindow.webContents.send(downloadProgress, ...args)
    const onFinish = (...args: any) => context.mainWindow.webContents.send(downloadFinish, ...args)
    const onError = (...args: any) => context.mainWindow.webContents.send(downloadError, ...args)
    downloadService.startDownload(videoId, videoName, onFinish, onError, onProgress)
  },
  [CURRENT_DOWNLOAD_VIDEO_ID]: (event, context) => {
    const downloadService = DownloadService.getInstance()
    return downloadService.getCurrentDownloadVideoId()
  },
  [DOWNLOAD_CANCEL]: (event, context) => {
    const downloadService = DownloadService.getInstance()
    downloadService.cancelDownload()
  }
}

