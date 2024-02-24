import React from 'react';

export const Video = ({ videoDetails }) => {
  return (
    <div>
      <img src={videoDetails?.thumbnails?.high?.url} />
      <h3>{videoDetails?.title}</h3>
    </div>
  );
};

export default Video;
