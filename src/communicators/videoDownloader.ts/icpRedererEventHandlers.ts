import { contextBridge, ipcRenderer } from "electron";
import { IcpRedererEventHandlerBase } from "../base/icpRedererEventHandler";
import { API_NAME, DOWNLOAD_FILE_OPERATION, NAMESPACE, ON_DOWNLOAD_FILE_PROGRESS } from "./constants";


const invokeFileDownload = new IcpRedererEventHandlerBase(NAMESPACE, DOWNLOAD_FILE_OPERATION, API_NAME);
invokeFileDownload.registerCommunicationFn(ipcRenderer, contextBridge)

const onFileDownloadProgress = new IcpRedererEventHandlerBase(NAMESPACE, ON_DOWNLOAD_FILE_PROGRESS, API_NAME);
onFileDownloadProgress.registerCommunicationFn(ipcRenderer, contextBridge, 'on')