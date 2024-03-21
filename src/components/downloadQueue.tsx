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
import { ERROR_CODES } from "../shared/errorCodes";

const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);

export const DownloadQueue = () => {
  const [downloadProgress, setDownloadProgress] = useState(null)
  const [setSettings] = useSetSettingsMutation()
  const [updateVideoStatus] = useUpdateVideoStatusMutation()
  const { data: appSettings } = useGetSettingsQuery({})
  const { queuedVideos, videoInDownloadStatus } = useGetVideosQuery({}, {
    selectFromResult: ({ data }) => {
      if (data) {
        // Replace the condition with your filtering logic
        const queuedVideos = data.filter((video: VideoData) => 'queued' === video.status);
        const videoInDownloadStatus = data.find((video: VideoData) => 'downloading' === video.status);
        return { queuedVideos, videoInDownloadStatus }
      }
      return { queuedVideos: [] };
    },
  })

  const startDownload = async (videoId: string, videoTitle: string, downloadPath: string) => {
    downloadPath = downloadPath + '/' || './downloads'
    const downloadingVideoId = await fileDownloadCommunicator.call.downloadStart(downloadPath, videoId, videoTitle, {})
    if (downloadingVideoId) {
      await updateVideoStatus({ id: videoId, status: 'downloading' })
      setDownloadProgress({
        videoId,
        estimatedDownloadTime: 0,
        percent: 0
      })
    }
  }


  useEffect(() => {
    fileDownloadCommunicator.on.downloadProgress((videoId, estimatedDownloadTime, percent) => {
      setDownloadProgress({
        videoId,
        estimatedDownloadTime,
        percent
      })
    })

    fileDownloadCommunicator.on.downloadError(async (videoId, error) => {
      console.log(error, videoId)
      if (error !== ERROR_CODES.DOWNLOAD_IN_PROGRESS) {
        setDownloadProgress(null)
        await updateVideoStatus({ id: videoId, status: 'failed' })
      }
    })

    fileDownloadCommunicator.on.downloadFinish(async (videoId) => {
      setDownloadProgress(null)
      await updateVideoStatus({ id: videoId, status: 'downloaded' })
    })
  }, [])



  useEffect(() => {
    if (!downloadProgress) {
      console.log(1);

      if (videoInDownloadStatus) {
        console.log(2);

        fileDownloadCommunicator.call.currentDownloadVideoId().then((videoId: string) => {
          console.log(3);

          if (videoId && videoInDownloadStatus.id !== videoId) {
            console.log(4, videoId);

            startDownload(videoInDownloadStatus.id, videoInDownloadStatus.name, appSettings?.downloadPath)
          }
        })
      } else if (queuedVideos.length) {
        console.log(5);

        startDownload(queuedVideos[0].id, queuedVideos[0].name, appSettings?.downloadPath)
      }
    }

  }, [queuedVideos, videoInDownloadStatus])



  const handleSelectDirectory = async () => {
    // Invoke the selectDirectory method exposed via preload script
    const downloadPath = await selectDirectoryCommunicator.call.selectDirectory()
    if (downloadPath) {
      setSettings({ downloadPath })
    }
  };

  return <div>
    <Button onClick={async () => await handleSelectDirectory()}>Select Destination Folder</Button>

    <Button onClick={() => fileDownloadCommunicator.call.downloadCancel()}>Stop</Button>
    {queuedVideos && <p>Download Queue: {queuedVideos.length}</p>}

    <LinearProgress determinate value={downloadProgress?.percent * 100 || 0} />

    {queuedVideos?.map((video: VideoData, i) => (
      <div key={video.id || i}>
        <p>{video.name}</p>
      </div>
    ))}
  </div>
}