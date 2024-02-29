import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, IconButton, Stack, Typography } from '@mui/joy';
import FileDownload from '@mui/icons-material/FileDownload';


const PlaylistView = () => {
  const { playlistId } = useParams();

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
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.</Typography>
                <IconButton aria-label="delete" size="sm">
                  <FileDownload fontSize='small' />
                </IconButton>
                {/*<Button loading variant="soft">Download</Button>*/}
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default PlaylistView;
