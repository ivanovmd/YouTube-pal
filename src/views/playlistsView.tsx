import React, { useEffect } from 'react';
import { useGetPlaylistsQuery } from '../store/youtube/youtubeApi';
import Playlist from '../components/playlist';
import { Link } from 'react-router-dom';

const PlaylistsView = ({ pageToken }) => {
  const { data: playlists, error, isLoading } = useGetPlaylistsQuery({ pageToken });

  useEffect(() => {
    console.log(playlists)
  }, [playlists])

  return (
    <div>
      {playlists?.items?.map((playlist: any) => {
        //return <Playlist key={playlist.id} id={playlist.id} />
        return <Playlist key={playlist.id} playlist={playlist} />
      })}
    </div>
  );
};

export default PlaylistsView;