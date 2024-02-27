import React, { useEffect } from 'react';
import { useGetPlaylistsQuery } from '../store/youtube/youtubeApi';
import Playlist from '../components/playlist';
import { Link } from 'react-router-dom';


interface PlaylistsViewProps {
  pageToken?: string
}

/**
 * React functional component for displaying playlists.
 *
 * @param {PlaylistsViewProps} pageToken - The page token for fetching playlists.
 * @return {JSX.Element} The component for displaying playlists.
 */
const PlaylistsView: React.FC<PlaylistsViewProps> = ({ pageToken }) => {
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