import { Button, Card, Container, Stack } from '@mui/joy';
import React from 'react';

export const AuthView = () => {
  return (
    <>
      <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row"
          justifyContent="center"
          alignItems="center">

          <Button >
            Log In With Google
          </Button>
        </Stack>
      </Container>

    </>
  )
}
