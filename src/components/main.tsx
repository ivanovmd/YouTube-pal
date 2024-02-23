import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Auth } from './auth';
import Content from './content';
import { Link, Outlet } from 'react-router-dom';
import { fetchAuthToken } from '../store/auth/authSlice';
import { useLocalStorage } from '@uidotdev/usehooks';


const Main: React.FC = () => {
  const [authToken, setAuthToken] = useLocalStorage('authToken', null);


  return (
    <>
      <div>
        <h1>YT Pal</h1>
      </div>

      {authToken ?
        //<Content />
        <>
          <Link to='/' >Home</Link>
          <Link to='/playlists' >Playlists</Link>
        </>
        :
        <Auth />}


      <Outlet />
    </>
  );
};

export default Main;
