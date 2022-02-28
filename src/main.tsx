import React from 'react';

import ReactDOM from 'react-dom';
import './styles/index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import { SpotifyProvider } from './contexts/SpotifyContext';
import { YoutubeProvider } from './contexts/YoutubeContext';
import SpotifyHandleAuthentication from './handlers/SpotifyHandleAuthentication';
import YoutubeHandleAuthentication from './handlers/YoutubeHandleAuthentication';
import Spotify from './SpotifyView';
import Youtube from './YoutubeView';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="/spotify"
          element={(
            <SpotifyProvider>
              <Spotify />
            </SpotifyProvider>
          )}
        />
        <Route
          path="/youtube"
          element={(
            <YoutubeProvider>
              <Youtube />
            </YoutubeProvider>
          )}
        />
        <Route path="/callback">
          <Route path="spotify" element={<SpotifyHandleAuthentication />} />
          <Route path="youtube" element={<YoutubeHandleAuthentication />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
