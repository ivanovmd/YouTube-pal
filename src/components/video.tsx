import React, { useEffect, useState } from 'react';
import { ViewSliceCommunicator } from '../communicators/base/viewSliceCommunicator';
import { fileDownloadApi } from '../communicators/videoDownloader/common';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import { FileDownload } from '@mui/icons-material';
import { openExternalApi } from '../communicators/openExternal/common';
import { useGetSettingsQuery } from '../store/appSettings/appSettingsSlice';
import { addVideoForDownload, useGetVideosQuery, VideoData } from '../store/videos/videosSlice';
import { useAppDispatch } from '../store/store';


const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);
const openExternalCommunicator = new ViewSliceCommunicator(openExternalApi, window);

export const Video = ({ videoDetails }) => {
  const dispatch = useAppDispatch()
  const [downloadedPercent, setDownloadedPercent] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { data: appSettings, error, isLoading } = useGetSettingsQuery({})
  const { data: videosData } = useGetVideosQuery({})


  useEffect(() => {
    console.log(videosData);
  }, [videosData])

  useEffect(() => {
    fileDownloadCommunicator.on.downloadProgress((videoId, estimatedDownloadTime, percent) => {
      setDownloadedPercent(percent)
      if (percent === 1) {
        setIsDownloading(false)
      }
    })

    fileDownloadCommunicator.on.downloadError((videoId, error) => {
      console.log(error)
      setIsDownloading(false)
    })
  }, [])

  const startDownload = () => {
    const downloadPath = appSettings?.downloadPath + '/' || './downloads / '
    fileDownloadCommunicator.call.downloadStart(downloadPath, videoDetails.resourceId.videoId, videoDetails.title, {})
    setIsDownloading(true)
  }

  const addTotTheQueue = () => {
    const videoData: VideoData = {
      id: videoDetails.resourceId.videoId,
      name: videoDetails.title,
      url: 'https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId,
      downloadPath: appSettings?.downloadPath || './downloads',
      status: 'queued'
    }
    dispatch(addVideoForDownload.initiate(videoData))
  }

  return (

    <Box padding={2} sx={{ maxWidth: '300px' }}>
      <img style={{ maxWidth: '100%', borderRadius: '10px' }} src={videoDetails?.thumbnails?.high?.url} alt={videoDetails?.title} width={300} height={225} />

      <Stack direction="row" alignItems="center" spacing={1}>

        <Typography sx={{
          width: '100%',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
        ><span>{videoDetails?.title}</span></Typography>

        <IconButton aria-label="delete" size="sm"
          //onClick={() => startDownload()}
          onClick={() => addTotTheQueue()}
          loading={isDownloading}>
          <FileDownload fontSize="inherit" />
        </IconButton>

        <Button
          //onClick={() => openExternalCommunicator.call.openExternal('https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId)}
          onClick={() => addTotTheQueue()}
        >Open</Button>
      </Stack>
    </Box>
  );
};

export default Video;
