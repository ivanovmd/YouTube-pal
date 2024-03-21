import React, { useEffect, useState } from 'react';
import { ViewSliceCommunicator } from '../communicators/base/viewSliceCommunicator';
import { fileDownloadApi } from '../communicators/videoDownloader/common';
import { Box, Button, IconButton, Stack, Typography } from '@mui/joy';
import { FileDownload } from '@mui/icons-material';
import { openExternalApi } from '../communicators/openExternal/common';
import { useGetSettingsQuery } from '../store/appSettings/appSettingsSlice';
import { useAddVideoForDownloadMutation, useUpdateVideoStatusMutation, VideoData } from '../store/videos/videosSlice';
import { useAppDispatch } from '../store/store';


const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);
const openExternalCommunicator = new ViewSliceCommunicator(openExternalApi, window);

export const Video = ({ videoDetails }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { downloadPath } = useGetSettingsQuery({}, {
    selectFromResult: (result) => result.data
  })
  const [updateVideoStatus] = useUpdateVideoStatusMutation()
  const [addVideoForDownload] = useAddVideoForDownloadMutation()

  const startDownload = () => {
    fileDownloadCommunicator.call.downloadStart(downloadPath || './downloads', videoDetails.resourceId.videoId, videoDetails.title, {})
    setIsDownloading(true)
  }

  const addToTheQueue = async () => {
    const videoData: VideoData = {
      id: videoDetails.resourceId.videoId,
      name: videoDetails.title,
      url: 'https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId,
      downloadPath: downloadPath || './downloads',
      status: 'queued'
    }
    await addVideoForDownload(videoData)
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
          onClick={async () => await addToTheQueue()}
          //onClick={() => openExternalCommunicator.call.openExternal('https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId)}
          loading={isDownloading}>
          <FileDownload fontSize="inherit" />
        </IconButton>

        {/*<Button
          onClick={() => openExternalCommunicator.call.openExternal('https://www.youtube.com/watch?v=' + videoDetails.resourceId.videoId)}
        //onClick={() => addToTheQueue()}
        >Open</Button>*/}

        {/*<Button
          onClick={() => updateVideoStatus({ id: videoDetails.resourceId.videoId, status: 'downloading' })}
        >U</Button>*/}
      </Stack>
    </Box>
  );
};

export default Video;
