import React, { useState } from 'react';

export const YouTubeVideoForm = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  const validateVideoUrl = () => {
    // Regular expression to validate YouTube video URL
    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+/;

    if (videoUrl.match(youtubeUrlRegex)) {
      setError('');
    } else {
      setError('Invalid YouTube video URL');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={validateVideoUrl}>Validate</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default YouTubeVideoForm;
