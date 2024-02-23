
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './components/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Playlists from './components/playlists';
import Playlist from './components/playlist';

const App = () => {

  return (
    <GoogleOAuthProvider clientId="1039150483129-0ejpp700seo8n1n1o8oci80porl0q9ik.apps.googleusercontent.com">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Main />} >
              <Route path='playlists' element={<Playlists />} />
              <Route path='/playlists/:playlistId' element={<Playlist />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider >
  );
}

const root = createRoot(document.body);
root.render(<App />);