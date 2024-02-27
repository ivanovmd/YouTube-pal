
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './components/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlaylistView from './views/playlistView';
import PlaylistsView from './views/playlistsView';
import { HomeView } from './views/homeView';
import { Auth } from './components/auth';
import { AuthView } from './views/authView';
import { DownloadVideoView } from './views/downloadVideoView';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1039150483129-0ejpp700seo8n1n1o8oci80porl0q9ik.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} >
              <Route path='/playlists' element={<PlaylistsView />} />
              <Route path='/playlists/:playlistId' element={<PlaylistView />} />
            </Route>
            {/*<Route path='/download-video' element={<DownloadVideoView />} />
            <Route path='/login' element={<AuthView />} />
            <Route path='*' element={<p>Not found</p>} />*/}
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider >
  );
}

const root = createRoot(document.body);
root.render(<App />);