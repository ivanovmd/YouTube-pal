import React from "react";
import { useDispatch } from "react-redux";
import { setAuthToken } from "../store/auth/authSlice";
import { useGoogleLogin } from '@react-oauth/google';


export const Auth = () => {
  const dispatch = useDispatch();

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      dispatch(setAuthToken(tokenResponse.access_token));
    },
  });

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
}
