import { Button } from "@mui/joy"
import React from "react"
import { ViewSliceCommunicator } from "../communicators/base/viewSliceCommunicator";
import { selectDirectoryApi } from "../communicators/selectDirectory/common";
import { useAppDispatch } from '../store/store';
import { setSettings } from "../store/appSettings/appSettingsSlice";
const selectDirectoryCommunicator = new ViewSliceCommunicator(selectDirectoryApi, window);

export const DownloadQueue = () => {
  const dispatch = useAppDispatch()

  const handleSelectDirectory = async () => {
    // Invoke the selectDirectory method exposed via preload script
    const downloadPath = await selectDirectoryCommunicator.call.selectDirectory()
    if (downloadPath) {
      dispatch(setSettings.initiate({ downloadPath }))
    }
  };

  return <div>
    <Button onClick={() => handleSelectDirectory()}>Select Destination Folder</Button>
    <p>Download Queue</p>
  </div>
}