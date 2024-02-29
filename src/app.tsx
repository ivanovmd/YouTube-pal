
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Main } from './components/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PlaylistView from './views/playlistView';
import PlaylistsView from './views/playlistsView';
import { AuthView } from './views/authView';
import { DownloadVideoView } from './views/downloadVideoView';
import '@fontsource/inter';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="1039150483129-0ejpp700seo8n1n1o8oci80porl0q9ik.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} >
              <Route path='/' element={<PlaylistsView />} />
              <Route path='/playlists/:playlistId' element={<PlaylistView />} />
              <Route path='/download-video' element={<DownloadVideoView />} />
              <Route path='/login' element={<AuthView />} />
            </Route>
            <Route path='*' element={<p>Not found</p>} />
            <Route path='/auth' element={<AuthView />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider >
  );
}

const root = createRoot(document.body);
root.render(<App />);