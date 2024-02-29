import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, IconButton, Stack, Typography } from '@mui/joy';
import FileDownload from '@mui/icons-material/FileDownload';
import Videos from '../components/videos';


const PlaylistView = () => {
  const { playlistId } = useParams();

  return <Container sx={{ height: '100%', display: 'flex', flexWrap: 'wrap' }}>

    <Videos playlistId={playlistId} />

  </Container>
};

export default PlaylistView;
