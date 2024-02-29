import React, { useEffect } from 'react';
import { Auth } from './auth';
import { Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import localStorageProxy from '../services/localStorageService';



export const Main: React.FC = () => {
  const [authToken] = useLocalStorage('authToken', null);

  const handleStorageChange = () => console.log("handleStorageChange");

  //useEventListener(window, "storage", handleStorageChange);

  useEffect(() => {
    console.log("authToken", authToken)
  }, [authToken])


  return (
    <>
      <p>this is still main</p>

      {!authToken ?
        <Auth />
        :
        <Outlet />
      }
      <button onClick={() => localStorageProxy.removeItem('authToken')}>Logout</button>

    </>
  );
};

export default Main;
