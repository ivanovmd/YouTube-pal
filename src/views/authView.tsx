import React, { useEffect } from 'react';
import { useGetPlaylistsQuery } from '../store/youtube/youtubeApi';
import Playlist from '../components/playlist';
import { Link } from 'react-router-dom';

export const AuthView = () => {
  return <p>Please Login</p>
}
