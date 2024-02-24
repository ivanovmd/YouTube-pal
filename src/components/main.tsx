import React from 'react';
import { Auth } from './auth';
import Content from './content';
import { Link, Outlet } from 'react-router-dom';
import { useLocalStorage } from '@uidotdev/usehooks';


const Main: React.FC = () => {
  const [authToken] = useLocalStorage('authToken', null);


  return (
    <>
      <div>
        <h1>YT Pal</h1>
      </div>

      {authToken ?
        <>
          <Content />
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
