import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Auth } from './auth';
import Content from './content';
import { Link, Outlet } from 'react-router-dom';


const Main: React.FC = () => {
  const authToken = useSelector((state: AppState) => state.auth.authToken)


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
