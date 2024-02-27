import React, { useEffect, useState } from 'react';
import { ViewSliceCommunicator } from '../communicators/base/viewSliceCommunicator';
import { fileDownloadApi } from '../communicators/videoDownloader/common';


const fileDownloadCommunicator = new ViewSliceCommunicator(fileDownloadApi, window);


export const Video = ({ videoDetails }) => {
  const [downloadedPercent, setDownloadedPercent] = useState(0);
  useEffect(() => {
    fileDownloadCommunicator.on.downloadProgress((args) => {
      const [videoId, estimatedDownloadTime, percent] = args

      setDownloadedPercent(percent)
    })
  }, [])

  const startDownload = () => {
    fileDownloadCommunicator.call.downloadStart('./downloads/', 'rL6r7AdAYUU', 'video', {})
  }

  return (
    <div>
      <img src={videoDetails?.thumbnails?.high?.url} />
      <h3>{videoDetails?.title}</h3>
      <button onClick={() => startDownload()}>Start Download</button>

      <p>Downloaded: {downloadedPercent}%</p>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Video;
