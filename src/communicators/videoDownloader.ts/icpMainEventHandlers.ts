import { ipcMain } from "electron";
import { IcpMainEventDispatcherBase } from "../base/icpMainEventHandler";
import { DOWNLOAD_FILE_OPERATION, NAMESPACE } from "./constants";


const downloadFile = new IcpMainEventDispatcherBase(NAMESPACE, DOWNLOAD_FILE_OPERATION)
downloadFile.registerCommunicationFn(() => {
  return 'hi'
}, ipcMain)