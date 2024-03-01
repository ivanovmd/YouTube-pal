import { dialog } from "electron";
import { ICommunicatorApihandlers, IMainCommunicatorContext } from "../base/common"
import { SELECT_DIRECTORY } from "./common";

export const selectDirectorylHandlers: ICommunicatorApihandlers = {
  [SELECT_DIRECTORY]: async (event,) => {
    console.log(SELECT_DIRECTORY);

    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });
    if (canceled) {
      return null;
    } else {
      return filePaths[0];
    }
  }
}

