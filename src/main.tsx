import React from "react";

import ReactDOM from "react-dom";
import "./styles/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "./App";
import SpotifyHandleAuthentication from "./handlers/SpotifyHandleAuthentication";
import YoutubeHandleAuthentication from "./handlers/YoutubeHandleAuthentication";
import Spotify from "./SpotifyView";
import Youtube from "./YoutubeView";
import { DeezerView as Deezer } from "./DeezerView";
import DeezerHandleAutentication from "./handlers/DeezerHandleAutentication";
import { AppProvider } from "./contexts/AppContext";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/spotify" element={<Spotify />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/callback">
            <Route path="spotify" element={<SpotifyHandleAuthentication />} />
            <Route path="youtube" element={<YoutubeHandleAuthentication />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
