import React, { useEffect } from 'react';

export const Video = ({ videoDetails }) => {

  const startDownload = () => {
    window['fileDownload'].startDownload(videoDetails.resourceId.videoId)
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
