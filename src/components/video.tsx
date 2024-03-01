import React, { useEffect, useState } from 'react';
import { ViewSliceCommunicator } from '../communicators/base/viewSliceCommunicator';
import { fileDownloadApi } from '../communicators/videoDownloader/common';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import { FileDownload } from '@mui/icons-material';
import { openExternalApi } from '../communicators/openExternal/common';


const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);
const openExternalCommunicator = new ViewSliceCommunicator(openExternalApi, window);

export const Video = ({ videoDetails }) => {
  const [downloadedPercent, setDownloadedPercent] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);


  useEffect(() => {
    console.log(videoDetails);

  }, [videoDetails])

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
    fileDownloadCommunicator.call.downloadStart('./downloads/', videoDetails.resourceId.videoId, videoDetails.title, {})
    setIsDownloading(true)
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

        <IconButton aria-label="delete" size="sm" onClick={() => startDownload()} loading={isDownloading}>
          <FileDownload fontSize="inherit" />
        </IconButton>

        <Button onClick={() => openExternalCommunicator.call.openExternal('https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId)}>Open</Button>
      </Stack>
    </Box>
  );
};

export default Video;
