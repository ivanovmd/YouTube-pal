import React, { useEffect } from 'react';
import { useGetPlaylistsQuery } from '../store/youtube/youtubeApi';
import Playlist from '../components/playlist';
import { Container, Typography, } from '@mui/joy';

interface PlaylistsViewProps {
  pageToken?: string
}

const PlaylistsView: React.FC<PlaylistsViewProps> = ({ pageToken }) => {
  const { playlists, error, isLoading } = useGetPlaylistsQuery({ pageToken }, {
    selectFromResult: ({ data }) => ({ playlists: data ? data.items : [] })
  });

  return (
    <>
      <Container sx={{ display: 'flex' }}>
        <Typography level="h1">Playlists</Typography>
      </Container>
      <Container sx={{ height: '100%', display: 'flex', flexWrap: 'wrap' }}>
        {playlists?.map((playlist: any) => {
          return <Playlist key={playlist.id} playlist={playlist} />
        })}
      </Container >
    </>
  )
};

export default PlaylistsView;