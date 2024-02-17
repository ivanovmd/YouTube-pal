import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Auth } from './auth';

const Main: React.FC = () => {
  const authToken = useSelector((state: AppState) => state.auth.authToken)


  return (
    <>
      <div>
        <h1>YT Pal</h1>
      </div>

      {authToken ? <h3>Logged In</h3> : <Auth />}
    </>
  );
};

export default Main;
