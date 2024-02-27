import { DownloadService } from "../../services/downloadService"
import { ICommunicatorApihandlers, formatEventName } from "../base/common"
import { fileDownloadApi } from "./common"

export const fileDownloadHandlers: ICommunicatorApihandlers = {
  'downloadStart': (event, downloadDestination, videoId, videoName, downloadOptions = {}, context) => {
    console.log(downloadOptions);
    console.log(downloadDestination, videoId, videoName);
    console.log(context);



    const eventName = formatEventName(fileDownloadApi.namespace, 'downloadProgress')
    const downloadService = new DownloadService(downloadDestination, downloadOptions)
    const onProgress = (...args: any) => context.mainWindow.webContents.send(eventName, args)
    downloadService.startDownload(videoId, videoName, null, null, onProgress)
  }
}

