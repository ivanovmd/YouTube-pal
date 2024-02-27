import { DownloadService } from "../../services/downloadService"
import { ICommunicatorApihandlers, formatEventName } from "../base/common"
import { DOWNLOAD_PROGRESS, DOWNLOAD_START, fileDownloadApi } from "./common"

export const fileDownloadHandlers: ICommunicatorApihandlers = {
  [DOWNLOAD_START]: (event, downloadDestination, videoId, videoName, downloadOptions = {}, context) => {
    const downloadProgress = formatEventName(fileDownloadApi.namespace, DOWNLOAD_PROGRESS)
    const downloadService = new DownloadService(downloadDestination, downloadOptions)
    const onProgress = (...args: any) => context.mainWindow.webContents.send(downloadProgress, ...args)
    downloadService.startDownload(videoId, videoName, null, null, onProgress)
  }
}

