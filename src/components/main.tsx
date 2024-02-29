import React, { useEffect } from 'react';
import { Auth } from './auth';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import localStorageProxy from '../services/localStorageService';



export const Main: React.FC = () => {
  const [authToken] = useLocalStorage('authToken', null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate("/auth");
    }
  }, [authToken]);

  return (
    <>
      <Outlet />
    </>
  );
};

export default Main;
