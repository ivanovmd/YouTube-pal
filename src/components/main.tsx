import React, { useEffect } from 'react';
import { Auth } from './auth';
import { Outlet, useNavigate } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import localStorageProxy from '../services/localStorageService';
import { DownloadQueue } from './downloadQueue';
import { appSettingsApi, setSettings, useGetSettingsQuery } from '../store/appSettings/appSettingsSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../store/store';



export const Main: React.FC = () => {
  const dispatch = useAppDispatch()
  const [authToken] = useLocalStorage('authToken', null);
  const navigate = useNavigate();
  const { data: appSettings, error, isLoading } = useGetSettingsQuery({})

  useEffect(() => {
    if (!appSettings && !isLoading) {
      console.log('no settings');
      dispatch(setSettings.initiate({ settings: { downloadPath: '' } }))
    } else {
      console.log(appSettings);
    }
  }, [appSettings, isLoading]);

  useEffect(() => {
    if (!authToken) {
      navigate("/auth");
    }
  }, [authToken]);

  return (
    <>
      <DownloadQueue />
      <Outlet />
    </>
  );
};

export default Main;
