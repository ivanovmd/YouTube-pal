import { DIRECTORY_PICKER, INVOKER_NAME, ON_DIRECTORY_SELECTED, OPEN_DIRECTORY_DIALOG } from "./constants";


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
  return { [INVOKER_NAME]: () => ipcRenderer.invoke(OPEN_DIRECTORY_DIALOG) }
}

export const onDirectorySelectedListener = (ipcRenderer: any) => {
  return {
    [ON_DIRECTORY_SELECTED]: (callback: any) => ipcRenderer.on(ON_DIRECTORY_SELECTED, callback),
  }
}


export const getDirectoryPickerApi = () => window[DIRECTORY_PICKER as any] as any

export const removeSelectDirectoryListener = () => {
  return getDirectoryPickerApi().removeAllListeners(INVOKER_NAME)
}