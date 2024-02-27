import React, { useEffect } from 'react';
import { ViewSliceCommunicator } from '../communicators/base/viewSliceCommunicator';
import { fileDownloadApi } from '../communicators/videoDownloader/common';


const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);


export const Video = ({ videoDetails }) => {
  useEffect(() => {
    fileDownloadCommunicator.on.downloadProgress((...args) => {
      console.log(args)
    })
  }, [])

  const startDownload = () => {
    fileDownloadCommunicator.call.downloadStart('./downloads/', 'rL6r7AdAYUU', 'testVideo', {})
  }

  return (
    <div>
      <img src={videoDetails?.thumbnails?.high?.url} />
      <h3>{videoDetails?.title}</h3>
      <button onClick={() => startDownload()}>Start Download</button>

      <br />
      <br />
      <br />
    </div>
  );
};

export default Video;
