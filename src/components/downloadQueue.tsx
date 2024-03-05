import { Button } from "@mui/joy"
import React, { useEffect } from "react"
import { ViewSliceCommunicator } from "../communicators/base/viewSliceCommunicator";
import { selectDirectoryApi } from "../communicators/selectDirectory/common";
import { useAppDispatch } from '../store/store';
import { useGetSettingsQuery, useSetSettingsMutation } from "../store/appSettings/appSettingsSlice";
import { VideoData, useGetVideosQuery } from "../store/videos/videosSlice";
const selectDirectoryCommunicator = new ViewSliceCommunicator(selectDirectoryApi, window);

export const DownloadQueue = () => {
  const [setSettings] = useSetSettingsMutation()
  const { data: appSettings } = useGetSettingsQuery({})
  const { data: queuedVideos } = useGetVideosQuery({
    selectFromResult: (result) => {
      if (result.data) {
        // Replace the condition with your filtering logic
        return result.data.filter((video: VideoData) => video.status === 'queued');
      }
      return [];
    },
  })

  useEffect(() => {
    console.log(queuedVideos);
  }, [queuedVideos])


  const handleSelectDirectory = async () => {
    // Invoke the selectDirectory method exposed via preload script
    const downloadPath = await selectDirectoryCommunicator.call.selectDirectory()
    if (downloadPath) {
      setSettings({ downloadPath })
    }
  };

  return <div>
    <Button onClick={() => handleSelectDirectory()}>Select Destination Folder</Button>
    {queuedVideos && <p>Download Queue: {queuedVideos.length}</p>}
  </div>
}