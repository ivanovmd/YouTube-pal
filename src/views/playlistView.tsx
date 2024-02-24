import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Videos from '../components/videos';

const PlaylistView = () => {
  const { playlistId } = useParams();

  return (
    <>
      <Videos playlistId={playlistId} />
    </>
  );
};

export default PlaylistView;
