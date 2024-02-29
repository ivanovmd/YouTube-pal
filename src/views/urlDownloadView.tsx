import React from 'react';
import { Box, Button, Container, LinearProgress, Stack, TextField } from '@mui/material';


export const UrlDownloadView = () => {
  return (
    <>
      <Container>
        <Stack spacing={2} direction="row">
          <TextField fullWidth label="Enter YouTube URL" />
          <Button variant="contained">Download</Button>
        </Stack>
        <Box sx={{ width: '100%' }} marginTop={2}>
          <LinearProgress variant="determinate" value={30} />
        </Box>
      </Container>
    </>
  )
}
