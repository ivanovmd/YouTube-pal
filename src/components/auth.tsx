import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/auth/authSlice";
import { useGoogleLogin } from '@react-oauth/google';
import { useLocalStorage } from "@uidotdev/usehooks";


export const Auth = () => {
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useLocalStorage('authToken', null);

  useEffect(() => {
    console.log(authToken);

  }, [authToken])

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      setAuthToken(tokenResponse.access_token)
    },
    scope: 'https://www.googleapis.com/auth/youtube.readonly'
  });

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
