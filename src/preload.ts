// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { DatabaseSliceInvokers } from './infrastructure/database/invokers';
import { BRIDGE_NAME, dbSlices } from './infrastructure/database/constants';
import { registerOpenDirectoryDialogInvoker } from './infrastructure/fielSystem/getDownloadPath';
import { DIRECTORY_PICKER } from './infrastructure/fielSystem/constants';
import { fileDownloadApi } from './communicators/videoDownloader/common';
import { PreloadSliceCommunicator } from './communicators/base/preloadSliceCommunicator';
import { fileDownloadHandlers } from './communicators/videoDownloader/handlers';
import { openExternalApi } from './communicators/openExternal/common';


contextBridge.exposeInMainWorld('envVars', {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
});

contextBridge.exposeInMainWorld(DIRECTORY_PICKER, {
  ...registerOpenDirectoryDialogInvoker(ipcRenderer),
});

const databaseNames = Object.values(dbSlices);
const databaseInvokers = databaseNames.reduce((acc: any, dbName: string) => {
  const invokers = new DatabaseSliceInvokers(dbName).getInvokers();
  return { ...acc, ...invokers }
}, {});

contextBridge.exposeInMainWorld(BRIDGE_NAME, {
  ...databaseInvokers
});

console.log('I am here');

new PreloadSliceCommunicator(fileDownloadApi, {
  contextBridge,
  ipcRenderer
})

new PreloadSliceCommunicator(openExternalApi, {
  contextBridge,
  ipcRenderer
})

//contextBridge.exposeInMainWorld('fileDownload', {
//  'startDownload': (...args: any) => ipcRenderer.invoke('startDownload', ...args),
//  'onDownloadProgress': (callback: any) => ipcRenderer.on('downloadProgress', (_, value) => callback(value)),
//})