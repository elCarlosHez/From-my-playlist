import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import SpotifyView from './SpotifyView';
import { SpotifyProvider } from './contexts/SpotifyContext';
import SpotifyHandleAutentication from './handlers/SpotifyHandleAutentication';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/spotify"
          element={(
            <SpotifyProvider>
              <SpotifyView />
            </SpotifyProvider>
          )}
        />
        <Route path="/callback">
          <Route path="spotify" element={<SpotifyHandleAutentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
