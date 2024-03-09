import { Button, LinearProgress } from "@mui/joy"
import React, { useEffect, useState } from "react"
import { ViewSliceCommunicator } from "../communicators/base/viewSliceCommunicator";
import { selectDirectoryApi } from "../communicators/selectDirectory/common";
import { useAppDispatch } from '../store/store';
import { useGetSettingsQuery, useSetSettingsMutation } from "../store/appSettings/appSettingsSlice";
import { VideoData, useGetVideosQuery, useUpdateVideoStatusMutation } from "../store/videos/videosSlice";
import { fileDownloadApi } from "../communicators/videoDownloader/common";
const selectDirectoryCommunicator = new ViewSliceCommunicator(selectDirectoryApi, window);
import { debounce } from 'advanced-throttle-debounce';

const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);



export const DownloadQueue = () => {
  const [downloadProgress, setDownloadProgress] = useState({})
  const [setSettings] = useSetSettingsMutation()
  const [updateVideoStatus] = useUpdateVideoStatusMutation()
  const { data: appSettings } = useGetSettingsQuery({})
  const { queuedVideos } = useGetVideosQuery({}, {
    selectFromResult: ({ data }) => {
      if (data) {
        // Replace the condition with your filtering logic
        const queuedVideos = data.filter((video: VideoData) => video.status === 'queued');
        return { queuedVideos }
      }
      return { queuedVideos: [] };
    },
  })

  const startDownload = (videoId: string, videoTitle: string, downloadPath: string) => {
    downloadPath = downloadPath + '/' || './downloads / '
    fileDownloadCommunicator.call.downloadStart(downloadPath, videoId, videoTitle, {})
    updateVideoStatus('downloading', videoId)
  }

  useEffect(() => {
    fileDownloadCommunicator.on.downloadProgress((videoId, estimatedDownloadTime, percent) => {
      setDownloadProgress({
        videoId,
        estimatedDownloadTime,
        percent
      })
      console.log(percent * 100)
    })

    fileDownloadCommunicator.on.downloadError((videoId, error) => {
      setDownloadProgress({})
      updateVideoStatus({ id: videoId, status: 'failed' })
    })

    fileDownloadCommunicator.on.downloadFinish((videoId) => {
      setDownloadProgress({})
      updateVideoStatus({ id: videoId, status: 'downloaded' })
    })



  }, [])

  //useEffect(() => {
  //  if (appSettings) {
  //    console.log(appSettings);

  //  }
  //}, [appSettings])

  useEffect(() => {
    // check if there are videos in the queue
    // if there are, check if there are anything downloading at the moment
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

    <LinearProgress determinate value={downloadProgress?.percent * 100 || 0} />

    {queuedVideos?.map((video: VideoData, i) => (
      <div key={video.id || i}>
        <p>{video.name}</p>
      </div>
    ))}
  </div>
}