import React, { useEffect } from 'react';
import { useGetPlaylistsQuery } from '../store/youtube/youtubeApi';
import Playlist from '../components/playlist';
import { Link } from 'react-router-dom';
import { Box, Container, Paper, Stack, Typography } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';

interface PlaylistsViewProps {
  pageToken?: string
}

const PlaylistsView: React.FC<PlaylistsViewProps> = ({ pageToken }) => {
  const { data: playlists, error, isLoading } = useGetPlaylistsQuery({ pageToken });

  useEffect(() => {
    console.log(playlists)
  }, [playlists])

  //return (
  //  <div>
  //    {playlists?.items?.map((playlist: any) => {
  //      //return <Playlist key={playlist.id} id={playlist.id} />
  //      return <Playlist key={playlist.id} playlist={playlist} />
  //    })}
  //  </div>
  //);

  return (
    <>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {Array.from(Array(50).keys()).map((i) => (
            <Box key={i} padding={2} sx={{ maxWidth: '300px' }}>
              <img style={{ maxWidth: '100%' }} src="https://i.ytimg.com/vi/XLItXCpBJvQ/hq720.jpg?sqp=-oaymwEpCNAFEJQDSFryq4qpAxsIARUAAIhCGAHYAQHiAQwIFhACGAYgATgBQAE=&rs=AOn4CLB4w9TlAPHu-4P4dCQ0HnQE0xpM_g" alt="" />

              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{
                  width: '100%',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
                  variant="h6">Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
                <IconButton aria-label="delete" size="sm">
                  <DownloadIcon fontSize="inherit" />
                </IconButton>
                {/*<Button loading variant="soft">Download</Button>*/}
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
};

export default PlaylistsView;