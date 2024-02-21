// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron'
import { DatabaseSliceInvokers } from './infrastructure/database/invokers';
import { BRIDGE_NAME, dbSlices } from './infrastructure/database/constants';
import { onDirectorySelectedListener, registerOpenDirectoryDialogInvoker } from './infrastructure/fielSystem/getDownloadPath';
import { DIRECTORY_PICKER } from './infrastructure/fielSystem/constants';

contextBridge.exposeInMainWorld('envVars', {
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY
});

contextBridge.exposeInMainWorld(DIRECTORY_PICKER, {
  ...registerOpenDirectoryDialogInvoker(ipcRenderer),
  ...onDirectorySelectedListener(ipcRenderer)
});

contextBridge.exposeInMainWorld('api', {
  fetchDocuments: () => ipcRenderer.invoke('fetch-documents'),
  insertDocument: (doc) => ipcRenderer.invoke('insert-document', doc),
});


const databaseNames = Object.values(dbSlices);
const databaseInvokers = databaseNames.reduce((acc: any, dbName: string) => {
  const invokers = new DatabaseSliceInvokers(dbName).getInvokers();
  return { ...acc, ...invokers }
}, {});

contextBridge.exposeInMainWorld(BRIDGE_NAME, {
  ...databaseInvokers
});

