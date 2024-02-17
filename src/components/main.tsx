import React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../store/store';
import { Auth } from './auth';
import Content from './content';

const Main: React.FC = () => {
  const authToken = useSelector((state: AppState) => state.auth.authToken)


  return (
    <>
      <div>
        <h1>YT Pal</h1>
      </div>

      {authToken ?
        <Content />
        :
        <Auth />}
    </>
  );
};

export default Main;
