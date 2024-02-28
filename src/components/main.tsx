import React from 'react';
import { Auth } from './auth';
import { Outlet } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';


export const Main: React.FC = ({ }) => {
  const [authToken] = useLocalStorage('authToken', null);


  return (
    <>

      {!authToken ?
        <Auth />
        :
        <Outlet />

      }

    </>
  );
};

export default Main;
