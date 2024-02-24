import { DownloadService } from "../../services/downloadService"

export const NAMESPACE = "appApi"
export const DOWNLOAD_FILE_OPERATION = 'downloadFile'
export const API_NAME = "appApi"

export const ON_DOWNLOAD_FILE_PROGRESS = 'onDownloadFileProgress'
export const ON_DOWNLOAD_FILE_FINISH = 'onDownloadFileFinish'
export const ON_DOWNLOAD_FILE_ERROR = 'onDownloadFileError'


const downloadService = new DownloadService('.', {})