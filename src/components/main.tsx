import React, { useEffect } from 'react';
import { Auth } from './auth';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import localStorageProxy from '../services/localStorageService';
import { DownloadQueue } from './downloadQueue';
import { useGetSettingsQuery } from '../store/appSettings/appSettingsSlice';
import { useAppDispatch } from '../store/store';
import { AnotherQueue } from './anotherQueue';



export const Main: React.FC = () => {
  const dispatch = useAppDispatch()
  const [authToken] = useLocalStorage('authToken', null);
  const navigate = useNavigate();
  const { data: appSettings, error, isLoading } = useGetSettingsQuery({})

  useEffect(() => {
    if (!authToken) {
      navigate("/auth");
    }
  }, [authToken]);

  return (
    <>
      <AnotherQueue />
      <Outlet />
    </>
  );
};

export default Main;
