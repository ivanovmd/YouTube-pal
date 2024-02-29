import React, { useEffect } from 'react';
import { Video } from './video';
import { useGetPlaylistItemsQuery, youtubeApi } from '../store/youtube/youtubeApi';
import { useParams } from 'react-router-dom';
import { store } from '../store/store';


const Videos = ({ playlistId, pageToken }) => {
  const { data: videosResponse, error, isLoading } = useGetPlaylistItemsQuery({ playlistId, pageToken });

  return (
    <>
      {videosResponse?.items?.map(item => {
        return <Video key={item.id} videoDetails={item.snippet} />
      })}
      {videosResponse?.nextPageToken && <Videos playlistId={playlistId} pageToken={videosResponse?.nextPageToken} />}
    </>
  );
};

export default Videos;