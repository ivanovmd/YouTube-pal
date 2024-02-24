import { ipcRenderer } from "electron";
import { IcpRendererEventDispatcherBase } from "../base/icpRendererEventDispatcher";
import { API_NAME, DOWNLOAD_FILE_OPERATION, NAMESPACE, ON_DOWNLOAD_FILE_PROGRESS } from "./constants";


const downloadFile = new IcpRendererEventDispatcherBase(NAMESPACE, DOWNLOAD_FILE_OPERATION, API_NAME);
downloadFile.registerCommunicationFn()
const askMainDownloadFile = downloadFile.getCommunicationFn()

const onDownloadFileProgress = new IcpRendererEventDispatcherBase(NAMESPACE, ON_DOWNLOAD_FILE_PROGRESS, API_NAME);
onDownloadFileProgress.registerCommunicationFn()
const askForOnDownloadFileProgress = downloadFile.getCommunicationFn()

export { askMainDownloadFile, askForOnDownloadFileProgress }