
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';


const App = () => {
  return (
    <Provider store={store}>
      <h1>Hello from React!</h1>
    </Provider>
  );
}


const root = createRoot(document.body);
root.render(<App />);