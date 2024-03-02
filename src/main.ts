import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron';
import installExtension, { REDUX_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';
import { dbSlices } from './infrastructure/database/constants';
import { Databases } from './infrastructure/database/databases';
import { DatabaseSliceHandlers } from './infrastructure/database/handlers';
import { fileDownloadApi } from './communicators/videoDownloader/common';
import { MainSliceCommunicator } from './communicators/base/mainSliceCommunicator';
import { fileDownloadHandlers } from './communicators/videoDownloader/handlers';
import { openExternalHandlers } from './communicators/openExternal/handlers';
import { openExternalApi } from './communicators/openExternal/common';
import { selectDirectoryApi } from './communicators/selectDirectory/common';
import { selectDirectorylHandlers } from './communicators/selectDirectory/handlers';



// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const databaseNames = Object.values(dbSlices);
const databases = new Databases(databaseNames).getDatabases();

Object.keys(databases).forEach((dbName: string) => {
  const db = databases[dbName];
  db.ensureIndex({ fieldName: 'id', unique: true });
  new DatabaseSliceHandlers(dbName, db);
})



const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // This should be true to use contextBridge
    },
  });


  new MainSliceCommunicator(fileDownloadApi, {
    mainWindow,
    ipcMain
  }, fileDownloadHandlers)

  new MainSliceCommunicator(openExternalApi, {
    mainWindow,
    ipcMain
  }, openExternalHandlers)

  new MainSliceCommunicator(selectDirectoryApi, {
    mainWindow,
    ipcMain
  }, selectDirectorylHandlers)


  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  installExtension(REDUX_DEVTOOLS)
    .then((name) => console.log(`Added Extension: ${name}`))
    .catch((err) => console.log('An error occurred: ', err));
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
