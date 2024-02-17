
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Main from './components/main';

const App = () => {

  return (
    <GoogleOAuthProvider clientId="295406963755-hpdvcfmr50u3cl5bfbb5idaakgurfj6m.apps.googleusercontent.com">
      <Provider store={store}>
        <Main />
      </Provider>
    </GoogleOAuthProvider>
  );
}

const root = createRoot(document.body);
root.render(<App />);