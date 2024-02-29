import React, { useEffect } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import useLocalStorage from "../hooks/useLocalStorage";
import { Button } from "@mui/joy";



export const Auth = () => {
  const [authToken, setAuthToken] = useLocalStorage('authToken', null);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAuthToken(tokenResponse.access_token)
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly'
  });

  return (
    <Button onClick={() => login()}>
      Log In With Google
    </Button>
  );
}
