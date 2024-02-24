import { DIRECTORY_PICKER, SELECT_DIRECTORY, OPEN_DIRECTORY_DIALOG } from "./constants";


export const registerOpenDirectoryDialogHandler = (ipcMain: any, dialog: any) => {
  ipcMain.handle(OPEN_DIRECTORY_DIALOG, async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (canceled) {
      return null; // Handle cancellation or no selection
    } else {
      return filePaths[0]; // Return the selected directory path
    }
  });
}

export const registerOpenDirectoryDialogInvoker = (ipcRenderer: any) => {
  return { [SELECT_DIRECTORY]: () => ipcRenderer.invoke(OPEN_DIRECTORY_DIALOG) }
}


export const getDirectoryPickerApi = () => window[DIRECTORY_PICKER as any] as any

export const removeSelectDirectoryListener = () => {
  return getDirectoryPickerApi().removeAllListeners(SELECT_DIRECTORY)
}

