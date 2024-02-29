import { Button, Card, Container, Stack } from '@mui/joy';
import React, { useEffect } from 'react';
import { Auth } from '../components/auth';
import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

export const AuthView = () => {
  const [authToken] = useLocalStorage('authToken', null);
  const navigate = useNavigate()

  useEffect(() => {
    if (authToken) {
      navigate('/')
    }
  }, [authToken]);

  return (
    <>
      <Container sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Stack direction="row"
          justifyContent="center"
          alignItems="center">
          <Auth />
        </Stack>
      </Container>

    </>
  )
}
