import { shell } from "electron";
import { ICommunicatorApihandlers } from "../base/common"
import { OPEN_EXTERNAL } from "./common";

export const openExternalHandlers: ICommunicatorApihandlers = {
  [OPEN_EXTERNAL]: (event, url: string) => {
    console.log(OPEN_EXTERNAL, url);
    shell.openExternal(url)
  }
}

